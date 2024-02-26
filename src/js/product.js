import Alpine from "alpinejs";

Alpine.data("product", () => ({
  insumo: "",
  quantidade: "",
  medida: "",
  insumos: [],
  produto: "",
  calcular() {
    this.produto = this.insumos
      .reduce((acc, insumo) => {
        const insumoDbCheck =
          insumo.insumo.measured === "kg" || insumo.insumo.measured === "lt";
        const insumoCheck = insumo.medida === "kg" || insumo.medida === "lt";
        const formatInsumoDbQuantity = Number(insumo.insumo.quantity);
        const formatInsumoPrice = insumo.insumo.price;

        if (insumoDbCheck && insumoCheck) {
          acc +=
            (formatInsumoPrice / (formatInsumoDbQuantity * 1000)) *
            (insumo.quantidade * 1000);
          return acc;
        }

        if (insumoDbCheck) {
          acc +=
            (formatInsumoPrice / (formatInsumoDbQuantity * 1000)) *
            insumo.quantidade;
          return acc;
        }

        if (insumoCheck) {
          acc +=
            (formatInsumoPrice / formatInsumoDbQuantity) *
            (insumo.quantidade * 1000);
          return acc;
        }

        acc +=
          (Number(insumo.insumo.price) / Number(insumo.insumo.quantity)) *
          insumo.quantidade;
        return acc;
      }, 0)
      .toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    console.log(this.produto);
  },
  addInsumo() {
    this.insumos.push({
      insumo: JSON.parse(this.insumo),
      medida: this.medida,
      quantidade: this.quantidade,
    });
    this.insumo = "";
    this.medida = "";
    this.quantidade = "";
    console.log(this.insumos);
    this.calcular();
  },
  salvar() {
    fetch("/api/produtos/adicionar", {
      method: "POST",
      body: JSON.stringify(this.insumos),
    });
  },
}));
