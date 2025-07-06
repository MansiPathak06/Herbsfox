import React from "react";
import Footer from "./Footer";
import './blogs.css';

const Rawherbs = () => {
  return (
    <div className="out-container">
      <h1 className="page-heading">Raw Herbs</h1>
      <h1 className="date1">19 Mar Raw Herbs</h1>
      <h3 className="content2">Posted at 09:00h in HerbsFox by Herbsfox</h3>
      <h1 className="main-heading">
        🌿 Unlocking the Powerful Health Benefits of Jadibooti 🌱(Raw Herbs)🌱
      </h1>

      <div className="box-container">
        <div className="box">
          <h2 className="title">📖 Introduction to Raw Herbs</h2>
          <hr />
          <p>
            Raw herbs, commonly known as jadibooti in Hindi, have been used in
            traditional medicine for centuries… These natural wonders are packed
            with essential nutrients, vitamins, and minerals that have numerous
            health benefits. In this blog, we will explore the incredible health
            benefits of jadibooti and how they can enhance your physical and
            mental well-being.
          </p>
        </div>+
        <div className="box">
          <h2 className="title">🛡️ Boosting Immunity</h2>
          <hr />
          <p>
            Jadibooti is known for its immune-boosting properties… Herbs like
            tulsi (holy basil), ashwagandha, and neem are rich in antioxidants
            that fight against free radicals and reduce inflammation, thereby
            improving your body’s ability to fight infections and diseases.
          </p>
        </div>
        <div className="box">
          <h2 className="title">🌱 Enhancing Digestive Health</h2>
          <hr />
          <p>
            Jadibooti plays a crucial role in maintaining digestive health…
            Herbs like aloe vera, ginger, and ajwain (carom seeds) are renowned
            for their digestive benefits. Aloe vera soothes the digestive tract,
            reduces inflammation, and promotes better absorption of nutrients.
          </p>
        </div>
        <div className="box">
          <h2 className="title">🧘‍♀️ Stress Relief and Mental Well-being</h2>
          <hr />
          <p>
            Some herbs are excellent for mental health and stress relief…
            Ashwagandha and Brahmi are adaptogenic herbs that help reduce stress
            levels and improve focus. Chamomile tea is another great herb that
            promotes relaxation and better sleep.
          </p>
        </div>
        <div className="box">
          <h2 className="title">💊 Managing Diabetes</h2>
          <hr />
          <p>
            Some herbs naturally help in managing diabetes… Amla, bitter gourd,
            and fenugreek are excellent for regulating blood sugar levels. Amla
            is rich in antioxidants and increases insulin sensitivity, while
            bitter gourd contains compounds that mimic insulin.
          </p>
        </div>
        <div className="box">
          <h2 className="title">🌀 Detoxification and Weight Management</h2>
          <hr />
          <p>
            Many jadibooti herbs help in detoxification and weight management…
            Triphala, dandelion, and kutki are known for their liver detox
            properties. Triphala improves digestion and eliminates waste, while
            dandelion supports kidney function.
          </p>
        </div>
        <div className="box">
          <h2 className="title">✨ Conclusion</h2>
          <hr />
          <p>
            Harnessing the incredible health benefits of jadibooti can
            revolutionize your well-being… By incorporating these raw herbs into
            your daily routine, you can boost your immunity, improve digestion,
            relieve stress, manage diabetes, detoxify your body, and maintain a
            healthy weight.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rawherbs;
 // axios.post("http://localhost:5000/save-order", data, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // });
  // axios.get("http://localhost:5000/orders/18", {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  // });
