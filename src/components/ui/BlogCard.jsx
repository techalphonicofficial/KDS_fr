import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, Tag, Shield } from "lucide-react";
import { IMAGE_URL } from "@/config/api";

export default function BlogCard({ post }) {

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });


  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full"
    >

      <div
        className="premium-glass p-4 rounded-[2rem] border-white/5 
        group-hover:border-[#1565c0]/40 transition-all duration-500 
        h-full flex flex-col relative overflow-hidden"
        style={{ background: '#ffffffb3' }}
      >


        {/* Image Area */}
        <div className="relative h-60 md:h-72 lg:h-80 xl:h-96 rounded-2xl bg-[#0d1117] overflow-hidden mb-6 border border-white/5">


          {
            post.image ? (

              <Image
                src={`${IMAGE_URL}/${post.image}`}
                alt={post.title || "blog image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="100vw"
              />

            ) : (

              <div className="h-full flex items-center justify-center">

                <Tag
                  size={40}
                  className="text-[#1565c0]"
                />

              </div>

            )
          }


          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />





        </div>




        <div className="flex flex-col flex-1 px-2">


          <div className="flex items-center gap-6 mb-4">


            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#4f4f4f]">

              <Calendar size={14} className="text-[#1565c0]" />

              {formattedDate}

            </span>



            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#4f4f4f]">

              <User size={14} className="text-[#1565c0]" />

              {post.author}

            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#4f4f4f]">

              < Shield size={14} className="text-[#1565c0]" />

              {post.category}

            </span>





          </div>




          <h3
            className="text-2xl font-black text-gray-900 mb-4 
            group-hover:text-[#1565c0]"
          >

            {post.title}

          </h3>




          <p className="text-[#4f4f4f] text-sm leading-relaxed mb-6 line-clamp-3">

            "{post.excerpt}"

          </p>




          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#1565c0]">

            Read Analysis

            <ArrowRight size={14} />

          </div>


        </div>


      </div>


    </Link>
  );
}