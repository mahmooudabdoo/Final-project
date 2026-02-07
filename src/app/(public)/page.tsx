import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import ServiceSection from "./_components/ServiceSection";
import WhyUS from "./_components/WhyUS";

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <Hero />
      <WhyUS />
      <HowItWorks />
      <section className="container mx-auto max-w-7xl overflow-hidden">
        <ServiceSection
          title="Skin Diagnosis"
          description="Analyze skin photos using AI to detect common conditions like acne, eczema, moles, and skin cancer risks.
                        Fast, accurate, and easy — just upload a photo and get insights in seconds.
"
          cta="Explore Skin Diagnosis"
          ctaLink="/skin-diagnosis"
          image="/image10.jpg"
          side="left"
        />
        <ServiceSection
          title="Eye Diagnosis"
          description="Detect signs of cataracts, glaucoma, diabetic retinopathy, and other conditions."
          cta="Explore Eye Diagnosis"
          ctaLink="/eye-diagnosis"
          image="/image7.jpeg"
          side="right"
        />
        <ServiceSection
          title="Blood Report Analysis"
          description="Upload lab reports (CBC, lipid profiles, etc.) and get a detailed interpretation."
          cta="Explore Blood Report Analysis"
          ctaLink="/blood-diagnosis"
          image="/image4.jpg"
          side="left"
        />
        <ServiceSection
          title="Alzheimer’s Screening"
          description="Early cognitive screening using language, behavior, and test data."
          cta="Explore Alzheimer’s Screening"
          ctaLink="/alzhaimar"
          image="/image8.jpg"
          side="right"
        />
        <ServiceSection
          title="Brain Tumor Detection"
          description={`This AI-powered model analyzes brain MRI scans to detect and precisely segment potential tumors. It utilizes advanced deep learning algorithms to assist doctors and radiologists in identifying abnormal growths.
                        Key Functions:
                        - Detection: Determines if a tumor is present in the MRI scan.
                        - Segmentation: If a tumor is found, it highlights its exact location .
                        Supported Modality:
                        The model works exclusively with brain MRIs (T1-weighted or T2-weighted axial slices) in PNG or JPEG format. It does not support CT scans, X-rays, or PET images.`}
          cta="Explore Brain Tumor Detection"
          ctaLink="/brain-tumor"
          image="/image9.jpg"
          side="left"
        />
      </section>
    </main>
  );
}
