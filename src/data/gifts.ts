export type Categoria =
  | "cozinha"
  | "eletrodomesticos"
  | "quarto"
  | "sala"
  | "eletronicos"
  | "lua-de-mel"
  | "diversao";

export interface Gift {
  id: string;
  nome: string;
  preco: number;
  img: string;
  categoria: Categoria;
  humor?: boolean;
  presenteado?: boolean;
}


export const CATEGORIAS: { id: Categoria | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "cozinha", label: "Cozinha" },
  { id: "eletrodomesticos", label: "Eletrodomésticos" },
  { id: "quarto", label: "Quarto & Banho" },
  { id: "sala", label: "Sala" },
  { id: "eletronicos", label: "Eletrônicos" },
  { id: "lua-de-mel", label: "Lua de Mel" },
  { id: "diversao", label: "Diversão" },
];

// Imagens em /public/imagens/<id>.jpg — copie a pasta `imagens/` para `public/`.
export const PRESENTES: Gift[] = [
  { id: "jantar", nome: "Aparelho de jantar", preco: 500, img: "/imagens/jantar.jpg", categoria: "cozinha" },
  { id: "ar", nome: "Ar condicionado 12.000 btu", preco: 2200, img: "/imagens/ar.jpg", categoria: "eletrodomesticos" },
  { id: "netflix", nome: "1 ano de Netflix", preco: 600, img: "/imagens/netflix.jpg", categoria: "eletronicos" },
  { id: "esmeril", nome: "Acessório para cortar a unha do dedão do noivo", preco: 200, img: "/imagens/esmerilhadeira.jpg", categoria: "diversao", humor: true },
  { id: "cabeceira", nome: "Cabeceira King Size", preco: 800, img: "/imagens/cabeceira.jpg", categoria: "quarto" },
  { id: "rochele", nome: "É claro que eu posso pagar, meu marido tem 2 empregos", preco: 700, img: "/imagens/rochele.jpg", categoria: "diversao", humor: true },
  { id: "cobreleito", nome: "Cobreleito king", preco: 477.67, img: "/imagens/cobreleito.jpg", categoria: "quarto", presenteado: true },
  { id: "louca", nome: "Lava louças 10 serviços", preco: 2950, img: "/imagens/louca.jpg", categoria: "eletrodomesticos" },
  { id: "microondas", nome: "Microondas 30 litros", preco: 650, img: "/imagens/microondas.jpg", categoria: "eletrodomesticos" },
  { id: "patolino", nome: "Seja meu convidado preferido", preco: 700, img: "/imagens/patolino.jpg", categoria: "diversao", humor: true },
  { id: "razao", nome: "Cobertor para a noiva que está coberta de razão", preco: 200, img: "/imagens/razao.jpg", categoria: "diversao", humor: true },
  { id: "toalha", nome: "Jogo de toalha banhão", preco: 182.27, img: "/imagens/toalha.jpg", categoria: "quarto" },
  { id: "edredon", nome: "Edredon Queen 300 fios", preco: 500, img: "/imagens/edredon.jpg", categoria: "quarto", presenteado: true },
  { id: "purificador", nome: "Purificador de água", preco: 500, img: "/imagens/purificador.jpg", categoria: "eletrodomesticos" },
  { id: "buque", nome: "Aumente em 30% sua chance de pegar o buquê", preco: 150, img: "/imagens/buque.jpg", categoria: "diversao", humor: true },
  { id: "convidado", nome: "Levar alguém que não foi convidado", preco: 7965.49, img: "/imagens/convidado.jpg", categoria: "diversao", humor: true },
  { id: "cueca", nome: "Cueca sexy para lua de mel", preco: 100, img: "/imagens/cueca.jpg", categoria: "diversao", humor: true },
  { id: "ronaldo", nome: "Corte de cabelo do noivo por 6 meses", preco: 500, img: "/imagens/ronaldo.jpg", categoria: "diversao", humor: true },
  { id: "assadeiras", nome: "Conjunto de assadeiras Marinex", preco: 121, img: "/imagens/assadeiras.jpg", categoria: "cozinha" },
  { id: "tv", nome: 'TV 60"', preco: 3000, img: "/imagens/tv.jpg", categoria: "eletronicos" },
  { id: "parafusadeira", nome: "Parafusadeira e furadeira", preco: 500, img: "/imagens/parafusadeira.jpg", categoria: "eletronicos" },
  { id: "julius", nome: "Só pra dizer que não dei nada", preco: 20, img: "/imagens/julius.jpg", categoria: "diversao", humor: true },
  { id: "tacas", nome: "Taças de vinho", preco: 50, img: "/imagens/tacas.jpg", categoria: "cozinha" },
  { id: "tigela", nome: "Conjunto de bowls", preco: 50, img: "/imagens/tigela.jpg", categoria: "cozinha" },
  { id: "boleira", nome: "Boleira com tampa", preco: 50, img: "/imagens/boleira.jpg", categoria: "cozinha" },
  { id: "aspirador", nome: "Aspirador 2 em 1", preco: 200, img: "/imagens/aspirador.jpg", categoria: "eletrodomesticos" },
  { id: "panela", nome: "Panela de pressão elétrica", preco: 500, img: "/imagens/panela.jpg", categoria: "eletrodomesticos" },
  { id: "cadeira", nome: "Cadeira ergonômica", preco: 600, img: "/imagens/cadeira.jpg", categoria: "sala" },
  { id: "mixer", nome: "Mixer 3 em 1", preco: 170, img: "/imagens/mixer.jpg", categoria: "eletrodomesticos" },
  { id: "cristaleira", nome: "Cristaleira retrô", preco: 470, img: "/imagens/cristaleira.jpg", categoria: "sala" },
  { id: "americano", nome: "Jogo americano crochê", preco: 70, img: "/imagens/americano.jpg", categoria: "cozinha" },
  { id: "espelho", nome: "Espelho corpo inteiro", preco: 478, img: "/imagens/espelho.jpg", categoria: "quarto" },
  { id: "jarra", nome: "Kit jarra + taças", preco: 70, img: "/imagens/jarra.jpg", categoria: "cozinha" },
  { id: "panificadora", nome: "Panificadora", preco: 550, img: "/imagens/panificadora.jpg", categoria: "eletrodomesticos" },
  { id: "chaleira", nome: "Chaleira elétrica", preco: 150, img: "/imagens/chaleira.jpg", categoria: "eletrodomesticos" },
  { id: "navio", nome: "Ajuda na lua de mel", preco: 1000, img: "/imagens/navio.jpg", categoria: "lua-de-mel" },
  { id: "sobremesa", nome: "Taças de sobremesa", preco: 76, img: "/imagens/sobremesa.jpg", categoria: "cozinha" },
  { id: "processador", nome: "Multiprocessador Powerchop Philips Walita 127v", preco: 500, img: "/imagens/processador.jpg", categoria: "eletrodomesticos" },
  { id: "criado", nome: "Kit 2 Un Mesa de Cabeceira Sofia Estilo Industrial", preco: 352, img: "/imagens/criado.jpg", categoria: "quarto" },
  { id: "lateral", nome: "Mesa Lateral para Sofá com Espelho Luxo", preco: 114, img: "/imagens/lateral.jpg", categoria: "sala" },
  { id: "organizador", nome: "Kit 4 Organizadores de Geladeira 3.8 Litros", preco: 76, img: "/imagens/organizador.jpg", categoria: "cozinha" },
  { id: "pote", nome: "Kit 3 a 10 Potes Herméticos 2L Dispenser Organizador Lavanderia", preco: 100, img: "/imagens/pote.jpg", categoria: "cozinha" },
  { id: "centro", nome: "Kit 2 Mesas De Centro Madeira Design Orgânico Sala De Estar", preco: 285, img: "/imagens/centro.jpg", categoria: "sala" },
  { id: "tv42", nome: "Samsung Smartv 42 polegadas", preco: 1500, img: "/imagens/tv42.jpg", categoria: "eletronicos" },
  { id: "saladeira", nome: "Conjunto saladeira Ryo Maresia Areia Oxford", preco: 100, img: "/imagens/saladeira.jpg", categoria: "cozinha" },
  { id: "puff", nome: "Puff Dior Decorativo P/ Closet Dior Banqueta", preco: 200, img: "/imagens/puff.jpg", categoria: "quarto" },
  { id: "luminaria", nome: "Luminária de Piso Abajur Chão Com Cúpula Tecido Off White", preco: 190, img: "/imagens/luminaria.jpg", categoria: "sala" },
];

export function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
