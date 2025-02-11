// export const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD"
//     }).format(price)
//   }
// export const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("fr-FR", {
//     style: "currency",
//     currency: "XOF", // Code de devise pour FCFA
//   }).format(price);
// };

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    //   currencyDisplay: "name" // Afficher le nom complet de la devise
    }).format(price).replace("XOF", "FCFA");
  }