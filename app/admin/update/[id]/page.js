// /admin/update/:id - same as old adminController.editPage (form posts to /api/admin/update/:id)
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { getAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Update Post"
};

export default async function AdminUpdatePostPage({ params }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin");

  const { id } = await params;

  await connectDB();
  const post = await Post.findById(id).lean();

  if (!post) notFound();

  return (
    <div className="admin-update-body">
      <div className="container">
        <div className="card">
          <h2>✏️ Update Post</h2>

          <form method="POST" action={`/api/admin/update/${id}`}>
            {[
              ["routeName", "Route Name", "fa-route", post.routeName],
              ["title", "Title", "fa-heading", post.title],
              ["description", "Description", "fa-align-left", post.description],
              ["imageLink", "Image Link", "fa-image", post.imageLink],
              ["videoLink", "Video Link", "fa-video", post.videoLink],
              ["totalView", "Total Views", "fa-eye", post.totalView],
              ["duration", "Duration", "fa-clock", post.duration],
              [
                "category",
                "Category",
                "fa-tags",
                Array.isArray(post.category) ? post.category.join(",") : ""
              ]
            ].map(([name, label, icon, value]) => (
              <div className="field" key={name}>
                <label>{label}</label>
                <div className="input-wrapper">
                  <div className="input-box">
                    <i className={`fas ${icon}`}></i>
                    <input
                      id={name}
                      name={name}
                      defaultValue={value ?? ""}
                    />
                  </div>
                  <div className="input-btn">
                    <button
                      type="button"
                      className="copy-btn"
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      className="paste-btn"
                    >
                      Paste
                    </button>
                    <button
                      type="button"
                      className="clear-btn"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button type="submit">
              <i className="fas fa-save"></i> Update
            </button>
          </form>
        </div>
      </div>

      <div id="toast"></div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function showToast(msg){
              const toast = document.getElementById('toast');
              toast.innerText = msg;
              toast.style.opacity = '1';
              setTimeout(()=>{ toast.style.opacity = '0'; }, 2500);
            }
            function copyInput(id){
              const input = document.getElementById(id);
              navigator.clipboard.writeText(input.value);
              showToast("✅ Copied");
            }
            async function pasteInput(id){
              try{
                const text = await navigator.clipboard.readText();
                document.getElementById(id).value = text;
                showToast("📋 Pasted");
              }catch{
                showToast("❌ Paste blocked");
              }
            }
            function clearInput(id){
              document.getElementById(id).value = "";
              showToast("🗑 Cleared");
            }
            document.querySelectorAll('.field').forEach(function(field){
              const input = field.querySelector('input');
              const copy = field.querySelector('.copy-btn');
              const paste = field.querySelector('.paste-btn');
              const clear = field.querySelector('.clear-btn');
              if(!input) return;
              if(copy) copy.addEventListener('click', function(){ copyInput(input.id); });
              if(paste) paste.addEventListener('click', function(){ pasteInput(input.id); });
              if(clear) clear.addEventListener('click', function(){ clearInput(input.id); });
            });
          `
        }}
      />

      </div>
  );
}
