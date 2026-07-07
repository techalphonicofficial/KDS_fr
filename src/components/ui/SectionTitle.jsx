export default function SectionTitle({
  data,
  label,
  align = "left",
  titleClassName,
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>

     
        <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-[#1565c0] mb-3"
           dangerouslySetInnerHTML={{
          __html: data?.title || ""
        }}/>
      

      <h2
        className={`text-3xl md:text-4xl font-bold text-dark leading-tight mb-4 ${
          titleClassName ?? ""
        }`}
        style={{ fontFamily: "Outfit, sans-serif" }}
        dangerouslySetInnerHTML={{
          __html: data?.subtitle || ""
        }}
      />

      {data?.description && (
        <p
          className={`text-[#8b949e] text-base leading-relaxed ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
          dangerouslySetInnerHTML={{
            __html: data?.description || ""
          }}
        />
      )}

    </div>
  );
}