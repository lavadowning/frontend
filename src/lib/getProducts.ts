import qs from "qs";
export async function getProducts() {
  try {
    const res = await fetch(
      "http://localhost:1337/api/products?populate=*",
    );
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
}
export async function getOneProduct(id) {
  try {
    const res = await fetch(
      `http://localhost:1337/api/products/${id}?populate=*`
    );
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
}
export async function getFilteredProducts(category: string, maxPrice: number) {
  try {
    const isAll = category === "All";

    const query = qs.stringify(
      {
        filters: {
          ...(isAll
            ? {}
            : {
                category: {
                  $eq: category,
                },
              }),
          price: {
            $lte: maxPrice,
          },
        },
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetch(`http://localhost:1337/api/products?${query}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка при фильтрации продуктов:", error);
    return [];
  }
}
export async function getRecentProducts(
  category: string,
  currentProductId: number
) {
  try {
    const query = qs.stringify(
      {
        filters: {
          category: {
            $eq: category,
          },
          id: {
            $ne: currentProductId,
          },
        },
        populate: ["image"],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await fetch(`http://localhost:1337/api/products?${query}`);

    if (!res.ok) {
      throw new Error(`Ошибка при запросе: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
}
export async function getCartProducts(
  cartItems: { id: string; count: number }[]
) {
  try {
    const results = await Promise.all(
      cartItems.map(async (item) => {
        const product = await getOneProduct(item.id);
        if (!product) return null;
        return {
          ...product,
          count: item.count,
        };
      })
    );
    return results.filter(Boolean);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    return [];
  }
}
