import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import Package from "@layouts/Package";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { getPackages } from "services/package";

// for all regular pages
const RegularPages = ({ data }) => {
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
    >
      {layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : layout === "package" ? (
        <Package data={data} />
      ) : layout === "faq" ? (
        <Faq data={data} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const allslugs = getSinglePage("content");
  const slugs = allslugs.map((item) => item.slug);
  const paths = slugs.map((slug) => ({
    params: {
      regular: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  if (regular == "package") {
    const packageData = await getPackages().catch((err) =>
      console.log("ERROR :", err)
    );
    let data = {};
    if (packageData) {
      data = {
        frontmatter: {
          title: "Paket",
          layout: "package",
          draft: false,
          plans: packageData.data.map((pkg) => {
            pkg.button = {
              label: "Pesan Sekarang",
              link: `https://wa.me/+628121588315?text=Halo admin adysa, saya ingin memesan ${pkg.name} dan bergabung dalam bisnis`,
            };

            return pkg;
          }),
          call_to_action: {
            title: "Siap untuk bergabung ?",
            content:
              "Raih kesuksesan finansial dengan bisnis MLM skincare kami. Dapatkan dukungan dan pelatihan yang Anda butuhkan. Bergabunglah sekarang dan ubah hidup Anda! Mulailah membangun masa depan yang gemilang!",
            image: "/images/cta01.svg",
            button: {
              enable: true,
              label: "Hubungi Kami",
              link: "https://wa.me/+628121588315?text=Halo admin adysa, saya ingin bergabung menjadi member",
            },
          },
        },
        content: "",
      };
    }

    return {
      props: {
        slug: regular,
        data: data,
      },
    };
  }
  const regularPage = await getRegularPage(regular);
  return {
    props: {
      slug: regular,
      data: regularPage,
    },
  };
};
