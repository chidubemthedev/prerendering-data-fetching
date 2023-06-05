import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);
  const fetcher = (url) =>
    fetch("https://next-effect-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];

        for (const sales in data) {
          transformedSales.push({
            id: sales,
            username: data[sales].username,
            volume: data[sales].volume,
          });
        }

        setSales(transformedSales);
      });

  const { data, error, isLoading } = useSWR(
    "https://next-effect-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://next-effect-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const transformedSales = [];

  //       for (const sales in data) {
  //         transformedSales.push({
  //           id: sales,
  //           username: data[sales].username,
  //           volume: data[sales].volume,
  //         });
  //       }

  //       console.log(transformedSales);

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }
  
  if (isLoading && !sales) {
    return <p>Loading...</p>;
  }


  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://next-effect-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const sales in data) {
    transformedSales.push({
      id: sales,
      username: data[sales].username,
      volume: data[sales].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;
