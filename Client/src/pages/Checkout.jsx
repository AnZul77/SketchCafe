import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { DeckleCard } from "../components/VicoloBase";
import { createRazorpayOrder, loadRazorpayScript, verifyRazorpayPayment } from "../services/api";

export default function Checkout() {
  const { cart, placeOrder, orders, user, showPopup } = useApp();
  const [step, setStep] = useState("form");

  const [formData, setFormData] = useState({
    tableNumber: ""
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const payableAmount = Number((subtotal * 1.1).toFixed(2));

  const getErrorMessage = (err, fallbackMessage) => {
    return err?.response?.data?.message || err?.message || fallbackMessage;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setStep("processing");
    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay checkout failed to load.");
      }

      const response = await createRazorpayOrder(payableAmount);
      const razorpayOrderId = response.data.orderId;

      const paymentAmountPaise = Math.round(payableAmount * 100);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentAmountPaise,
        currency: "INR",
        name: "Vicolo",
        description: `Table ${formData.tableNumber} order`,
        order_id: razorpayOrderId,
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@test.com",
          contact: "+919999905408",
        },
        method: "upi",
        theme: {
          color: "#1b1c19",
        },
        handler: async function (paymentResponse) {
          try {
            const verificationResponse = await verifyRazorpayPayment(paymentResponse);

            if (!verificationResponse.data?.success) {
              throw new Error("Payment verification failed.");
            }

            await placeOrder(formData.tableNumber, paymentResponse);
            setStep("success");
            showPopup("Payment successful. Your order is confirmed.");
          } catch (verificationErr) {
            console.error("Payment verification failed", verificationErr);
            setStep("form");
            showPopup(getErrorMessage(verificationErr, "Payment verification failed. Please try again."));
          }
        },
        modal: {
          ondismiss: () => {
            setStep("form");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        console.error("Payment failed", response);
        setStep("form");
        showPopup("Payment failed. Please try again.");
      });
      razorpayInstance.open();
    } catch (err) {
      console.error(err);
      setStep("form");
      showPopup(getErrorMessage(err, "Failed to start payment. Please try again."));
    }
  };

  const latestOrder = orders[0];

  if (cart.length === 0 && step === "form") {
    return (
      <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen text-center px-8">
        <h2 className="font-headline text-4xl font-bold text-vicolo-ink tracking-tighter">Your receipt is empty.</h2>
        <Link to="/menu" className="text-vicolo-ochre font-headline text-xs tracking-widest mt-8 uppercase border-b border-vicolo-ochre/20 hover:border-vicolo-ochre transition-all inline-block">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-vicolo-paper min-h-screen font-body relative overflow-hidden">
      <main className="max-w-3xl mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-12"
            >
              <header className="text-center">
                <span className="font-script text-4xl text-vicolo-ochre mb-2 block">The Final Sketch</span>
                <h1 className="font-headline text-6xl font-bold text-vicolo-ink uppercase tracking-tighter">Inscription</h1>
                <div className="h-0.5 w-24 bg-vicolo-ochre/30 mx-auto mt-4" />
                
                {user && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-vicolo-ochre/10 border border-vicolo-ochre/20 flex items-center justify-center">
                      <span className="font-headline text-[10px] text-vicolo-ochre">{user.name[0]}</span>
                    </div>
                    <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink/40">Identity Confirmed: <span className="text-vicolo-ink font-bold">{user.name}</span></span>
                  </div>
                )}
              </header>

              <DeckleCard className="p-8 md:p-16 bg-vicolo-surface/40 shadow-2xl skew-x-[-0.5deg]">
                <form onSubmit={handlePlaceOrder} className="space-y-12">
                  <div className="space-y-6">
                    <label className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block">Your Table Corner</label>
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                      {["T-01", "T-02", "T-03", "T-04", "T-05", "T-06", "T-07", "T-08", "T-09", "T-10"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({ ...formData, tableNumber: t })}
                          className={`py-4 border-2 font-headline text-sm transition-all rough-border ${
                            formData.tableNumber === t 
                            ? "bg-vicolo-ink text-vicolo-paper border-vicolo-ink shadow-lg scale-105" 
                            : "bg-transparent border-vicolo-ink/10 text-vicolo-ink hover:border-vicolo-ochre"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {/* Hidden input for validation */}
                    <input type="hidden" required value={formData.tableNumber} />
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit" 
                      disabled={!formData.tableNumber}
                      className="w-full py-6 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-[0.5em] text-sm hover:bg-vicolo-ochre disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl rough-border -skew-x-1"
                    >
                      Pay ₹{payableAmount.toFixed(0)} and Seal the Order
                    </button>
                    {!formData.tableNumber && (
                      <span className="font-script text-xs text-vicolo-ochre mt-4 block text-center opacity-60">Please select a table to begin the brewing process...</span>
                    )}
                  </div>
                </form>
              </DeckleCard>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-vicolo-ochre rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-script text-3xl text-vicolo-ink">Ink...</span>
                </div>
              </div>
              <h2 className="font-headline text-3xl font-bold text-vicolo-ink uppercase tracking-widest animate-pulse">Inscribing your order</h2>
              <p className="font-body text-vicolo-ink-wash max-w-sm mx-auto">Wait just a moment while the sketchbook updates its history.</p>
            </motion.div>
          )}

          {step === "success" && latestOrder && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <div className="text-center">
                <span className="font-script text-5xl text-vicolo-ochre block mb-4 italic">Sealed & Confirmed.</span>
                <h1 className="font-headline text-4xl font-bold text-vicolo-ink uppercase tracking-tighter">Your Narrative Begins.</h1>
              </div>

              <DeckleCard className="p-8 md:p-12 shadow-2xl skew-x-[-0.5deg] border-2 border-vicolo-ochre/20">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                   <div className="space-y-8 grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block mb-2">Order ID</span>
                          <span className="font-headline text-3xl font-bold text-vicolo-ink">#{latestOrder._id.slice(-6)}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40 block mb-2">Location</span>
                          <span className="font-headline text-xl font-bold text-vicolo-ochre">{latestOrder.tableNumber}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="font-headline text-[10px] uppercase tracking-[0.4em] text-vicolo-ink/40">Real-time Status</span>
                           <span className="font-script text-2xl text-vicolo-ochre">{latestOrder.status}</span>
                        </div>
                        {/* High-fidelity Progress Bar */}
                        <div className="h-4 bg-vicolo-surface rounded-full overflow-hidden border border-vicolo-outline-light/10 relative">
                           <motion.div 
                             initial={{ width: latestOrder.status === 'pending' ? '33%' : latestOrder.status === 'preparing' ? '66%' : '100%' }}
                             animate={{ width: latestOrder.status === 'pending' ? '33%' : latestOrder.status === 'preparing' ? '66%' : '100%' }}
                             className="h-full bg-vicolo-ochre shadow-[0_0_15px_rgba(227,160,50,0.5)] transition-all duration-1000"
                           />
                           {/* Ink droplets pattern on bar */}
                           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1b1c19_1px,transparent_1px)] bg-size-[10px_10px]" />
                        </div>
                        <div className="flex justify-between text-[8px] uppercase tracking-widest text-vicolo-ink/20 font-headline">
                          <span>Pending</span>
                          <span>Preparing</span>
                          <span>Served</span>
                        </div>
                      </div>
                   </div>

                   <div className="md:w-64 space-y-6 md:border-l md:border-vicolo-ink/10 md:pl-12">
                      <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-vicolo-ink/40 block mb-4">Summary</span>
                      {latestOrder.items.map(item => (
                        <div key={item._id} className="flex justify-between text-sm">
                          <span className="font-headline font-bold text-vicolo-ink">{item.quantity}x {item.menuItem?.name}</span>
                        </div>
                      ))}
                      <div className="border-t border-vicolo-ink/10 pt-4 flex justify-between">
                        <span className="font-headline font-bold text-vicolo-ink">Total</span>
                        <span className="font-headline text-xl font-bold text-vicolo-ochre">₹{latestOrder.totalAmount.toFixed(0)}</span>
                      </div>
                   </div>
                </div>
              </DeckleCard>
              
              <div className="text-center space-y-8">
                 <p className="font-body text-vicolo-ink-wash">You can track your order live in your <Link to="/profile" className="text-vicolo-ochre border-b border-vicolo-ochre/20 hover:border-vicolo-ochre transition-all">Member Journal</Link>.</p>
                 <Link to="/menu" className="inline-block px-12 py-5 bg-vicolo-ink text-vicolo-paper font-headline uppercase tracking-widest text-xs hover:bg-vicolo-ochre transition-all rough-border">Add more to the story</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
