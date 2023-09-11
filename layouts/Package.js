import Link from "next/link";
import Cta from "./components/Cta";

function Package({ data }) {
  const {
    frontmatter: { title, plans, call_to_action },
  } = data;
  console.log("plans : ", plans);
  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">Daftar Paket</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            {plans.map((plan, index) => (
              <div
                className={`col-12 md:col-4 ${
                  index == 1 ? "col-recommended" : "lg:px-0"
                }`}
                key={index}
              >
                <div className="card text-center">
                  <h4>{plan.name}</h4>
                  <div className="mt-5">
                    <span className="text-5xl text-dark">
                      Rp. {new Intl.NumberFormat("id-ID").format(plan.amount)}
                    </span>
                  </div>
                  <h5 className="mt-2 font-normal text-text">
                    {plan.subtitle}
                  </h5>
                  <p className="text-muted mx-5 mt-5">{plan.description}</p>
                  <Link
                    className={`btn mt-5 ${
                      index == 1 ? "btn-primary" : "btn-outline-primary"
                    }`}
                    href={plan.button.link}
                    rel={plan.button.rel}
                    target="_blank"
                  >
                    {plan.button.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Package;
