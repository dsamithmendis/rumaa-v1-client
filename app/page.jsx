import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold">Contact Us</h1>
      <p>Please fill in the form below</p>

     <ContactForm/>
    </div>
    </>
   
  );
}
