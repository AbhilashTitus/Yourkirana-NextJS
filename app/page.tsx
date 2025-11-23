import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="section">
        <div className="container">
          <h2>Shop by Category</h2>
          <CategoryGrid />
        </div>
      </section>
    </main>
  );
}
