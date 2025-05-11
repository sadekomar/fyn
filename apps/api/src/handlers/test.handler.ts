import prisma from "../lib/prisma";

const main = async () => {
  console.time("Category Count Query");

  const items = [
    { name: "Rice", price: 5 },
    { name: "Book", price: 20 },
    { name: "Chicken", price: 10 },
    { name: "Monitor", price: 100 },
  ];
  const totalPrice = items.reduce((total, item) => {
    return total + item.price;
  }, 0);

  // console.log("total price: ", totalPrice);

  const people: { name: string; age: number }[] = [
    { name: "Kyle", age: 26 },
    { name: "John", age: 31 },
    { name: "Sally", age: 42 },
    { name: "Jill", age: 42 },
  ];
  // {
  //   26: ["Kyle"],
  //   42: ["Sally", "Jill"]
  // };

  const formattedPeople = people.reduce((newObject, person) => {
    if (!newObject[person.age]) newObject[person.age] = [];
    newObject[person.age].push(person.name);
    return newObject;
  }, {} as Record<number, string[]>);

  // console.log(formattedPeople);

  const numbers = [13, 2, 5];
  const totalNumber = numbers.reduce((total, number) => {
    return total + number;
  });
  // console.log("totalNumber: ", totalNumber);

  // First, get all items with their categories
  const itemsWithCategories = await prisma.item.findMany({
    take: 300,
    select: {
      categories: {
        select: {
          name: true,
        },
      },
    },
  });

  // console.log(
  //   "itemsWithCategories:",
  //   itemsWithCategories.map((category) => category.categories)
  // );

  // [
  //   {name: 'jeans', count: 40},
  //   {name: 'pants', count: 10},
  //   {name: 'tops', count: 16},
  // ]

  // [
  // [ { name: 'hoodies' } ],
  // [ { name: 'pants' } ],
  // [ { name: 'jeans' } ],
  // [ { name: 'jeans' } ],
  // ]

  const categoriesCount = itemsWithCategories.reduce((counts, item) => {
    item.categories.forEach((category) => {
      counts[category.name] = (counts[category.name] || 0) + 1;
    });
    return counts;
  }, {} as Record<string, number>);

  console.log(categoriesCount);

  // // Then count category occurrences
  // const categoryCount = itemsWithCategories.reduce((counts, item) => {
  //   item.categories.forEach((category) => {
  //     const categoryName = category.name;
  //     counts[categoryName] = (counts[categoryName] || 0) + 1;
  //   });
  //   return counts;
  // }, {} as Record<string, number>);

  // // Convert to array format if needed
  // const formattedCategoryCounts = Object.entries(categoryCount).map(
  //   ([name, count]) => ({
  //     name,
  //     count,
  //   })
  // );

  // console.log("categoryCounts:", formattedCategoryCounts);
  console.timeEnd("Category Count Query");
};

main()
  .then(() => console.log("Script completed successfully"))
  .catch((error) => console.error("Error running script:", error))
  .finally(() => prisma.$disconnect());
