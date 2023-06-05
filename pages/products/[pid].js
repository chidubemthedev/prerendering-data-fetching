import fs from "fs/promises";
import path from "path";
import React from "react";

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  //if fallback is set to true this acts as the loading state
  //if blocking then no need for this
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
    // paths: [
    //   { params: { pid: "p1" } },
    //   //   { params: { pid: "p2" } },
    //   //   { params: { pid: "p3" } },
    // ],
  };
}

export default ProductDetailPage;
