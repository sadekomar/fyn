export function Newsletter() {
  return (
    <section className="bg-[#5e1e20] text-white px-6 py-16 md:py-24 text-center md:text-left">
      <div className="max-w-4xl mx-auto md:ml-12">
        <h2 className="text-3xl md:text-4xl font-serif mb-2">Join the club</h2>
        <p className="text-sm md:text-base text-white/80 mb-8 font-light">
          Get exclusive deals and early access to new products.
        </p>

        <form className="max-w-md w-full relative">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full bg-transparent border border-white/30 rounded-full py-3 px-6 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="sr-only">Subscribe</span>
            →
          </button>
        </form>
        
        <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end text-[10px] md:text-xs text-white/40 gap-4">
            <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
                <a href="#" className="hover:text-white transition-colors">Refund policy</a>
            </div>
             {/* Social icons would go here */}
        </div>
      </div>
    </section>
  );
}

