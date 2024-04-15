import React, { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const CatList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, 'poulet');
        const snapshot = await getDocs(colRef);
        const productsData = [];

        for (const doc of snapshot.docs) {
          const productData = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, productData.image));
          productsData.push({ ...productData, id: doc.id, imageUrl });
        }

        setProducts(productsData);
        setFilteredProducts(productsData); // Initialize filteredProducts with all products
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to filter products by category
  const handleFilter = (category) => {
    if (category === 'All') {
      setFilteredProducts(products); // Show all products if "All" category is selected
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered); // Filter products by selected category
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleFilter('poulet')}>Poulet</button>
        <button onClick={() => handleFilter('boeuf')}>Boeuf</button>
        <button onClick={() => handleFilter('lapin')}>Lapin</button>
        <button onClick={() => handleFilter('porc')}>Porc</button>
        <button onClick={() => handleFilter('All')}>All</button> {/* Add a button to show all products */}
      </div>
      <section className='grid grid-cols-2 content-center'>
        {filteredProducts.map((product, index) => (
          <div key={index}>
            <div>
              <img src={product.imageUrl} alt={product.title} />
              {product.title}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default CatList;
