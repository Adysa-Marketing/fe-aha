import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
const imgUrl = process.env.NEXT_PUBLIC_IMG;

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  return (
    <div className="section row pb-0">
      <div className="col-12 pb-12 lg:pb-24">
        <div className="row items-center">
          <div className="col-12 md:col-6">
            {posts[0]?.image && (
              <Image
                className="h-auto w-full rounded-lg"
                src={`${imgUrl}/${posts[0].image}`}
                alt={posts[0].excerpt}
                width={540}
                height={227}
                priority={true}
              />
            )}
          </div>
          <div className="col-12 md:col-6">
            <h2 className="h3 mb-2 mt-4">
              <Link
                href={`/${blog_folder}/${posts[0]?.slug}`}
                className="block hover:text-primary"
              >
                {posts[0]?.title}
              </Link>
            </h2>
            <p className="text-text">{plainify(posts[0]?.excerpt, "div")}</p>
            {posts[0] && (
              <Link
                className="btn btn-primary mt-4"
                href={`/${blog_folder}/${posts[0]?.slug}`}
                rel=""
              >
                Selengkapnya
              </Link>
            )}
          </div>
        </div>
      </div>
      {posts &&
        posts.slice(1).map((post, i) => (
          <div key={`key-${i}`} className="col-12 mb-8 sm:col-6 lg:col-4">
            {post.image && (
              <Image
                className="rounded-lg"
                src={`${imgUrl}/${post.image}`}
                alt={post.title}
                width={i === 0 ? "925" : "445"}
                height={i === 0 ? "475" : "230"}
              />
            )}
            <h2 className="h3 mb-2 mt-4">
              <Link
                href={`/${blog_folder}/${post.slug}`}
                className="block hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-text">{post.excerpt}</p>
            <Link
              className="btn btn-primary mt-4"
              href={`/${blog_folder}/${post.slug}`}
              rel=""
            >
              Read More
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Posts;
