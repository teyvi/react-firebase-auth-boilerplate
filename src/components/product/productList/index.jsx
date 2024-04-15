import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import CatList from "../../productCategory";

const List = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "products");
        const snapshot = await getDocs(colRef);
        const productsData = [];

        for (const doc of snapshot.docs) {
          const productData = doc.data();
          const imageUrl = await getDownloadURL(
            ref(storage, productData.image)
          );
          productsData.push({ ...productData, id: doc.id, imageUrl });
        }

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="grid grid-cols-2 place-content-center">
        {products.map((product, index) => (
          <section key={index}>
            <section>
              <img src={product.imageUrl} alt={product.Title} />
              {product.Title}
            </section>
            <div></div>
          </section>
        ))}
      </section>
      <Link to={"/category"}>
        <button>category</button>
      </Link>
    </div>
  );
};

export default List;
