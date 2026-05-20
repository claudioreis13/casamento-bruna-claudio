export interface Gift {
  id: string;
  nome: string;
  preco: number;
  img: string;
  humor?: boolean;
}

// Imagens em /public/imagens/<id>.jpg — copie a pasta `imagens/` para `public/`.
export const PRESENTES: Gift[] = [
  { id: "jantar", nome: "Aparelho de jantar", preco: 500, img: "/imagens/jantar.jpg" },
  { id: "ar", nome: "Ar condicionado 12.000 btu", preco: 2200, img: "/imagens/ar.jpg" },
  { id: "netflix", nome: "1 ano de Netflix", preco: 600, img: "/imagens/netflix.jpg" },
  { id: "esmeril", nome: "Acessório para cortar a unha do dedão do noivo", preco: 200, img: "/imagens/esmerilhadeira.jpg", humor: true },
  { id: "cabeceira", nome: "Cabeceira King Size", preco: 800, img: "/imagens/cabeceira.jpg" },
  { id: "rochele", nome: "É claro que eu posso pagar, meu marido tem 2 empregos 😂", preco: 700, img: "/imagens/rochele.jpg", humor: true },
  { id: "cobreleito", nome: "Cobreleito king", preco: 477.67, img: "/imagens/cobreleito.jpg" },
  { id: "louca", nome: "Lava louças 10 serviços", preco: 2950, img: "/imagens/louca.jpg" },
  { id: "microondas", nome: "Microondas 30 litros", preco: 650, img: "/imagens/microondas.jpg" },
  { id: "patolino", nome: "Seja meu convidado preferido", preco: 700, img: "/imagens/patolino.jpg", humor: true },
  { id: "razao", nome: "Cobertor para a noiva que está coberta de razão", preco: 200, img: "/imagens/razao.jpg", humor: true },
  { id: "toalha", nome: "Jogo de toalha banhão", preco: 182.27, img: "/imagens/toalha.jpg" },
  { id: "edredon", nome: "Edredon Queen 300 fios", preco: 500, img: "/imagens/edredon.jpg" },
  { id: "purificador", nome: "Purificador de água", preco: 500, img: "/imagens/purificador.jpg" },
  { id: "buque", nome: "Aumente em 30% sua chance de pegar o buquê", preco: 150, img: "/imagens/buque.jpg", humor: true },
  { id: "convidado", nome: "Levar alguém que não foi convidado", preco: 7965.49, img: "/imagens/convidado.jpg", humor: true },
  { id: "cueca", nome: "Cueca sexy para lua de mel", preco: 100, img: "/imagens/cueca.jpg", humor: true },
  { id: "ronaldo", nome: "Corte de cabelo do noivo por 6 meses", preco: 500, img: "/imagens/ronaldo.jpg", humor: true },
  { id: "assadeiras", nome: "Conjunto de assadeiras Marinex", preco: 121, img: "/imagens/assadeiras.jpg" },
  { id: "tv", nome: 'TV 60"', preco: 3000, img: "/imagens/tv.jpg" },
  { id: "parafusadeira", nome: "Parafusadeira e furadeira", preco: 500, img: "/imagens/parafusadeira.jpg" },
  { id: "julius", nome: "Só pra dizer que não dei nada", preco: 20, img: "/imagens/julius.jpg", humor: true },
  { id: "tacas", nome: "Taças de vinho", preco: 50, img: "/imagens/tacas.jpg" },
  { id: "tigela", nome: "Conjunto de bowls", preco: 50, img: "/imagens/tigela.jpg" },
  { id: "boleira", nome: "Boleira com tampa", preco: 50, img: "/imagens/boleira.jpg" },
  { id: "aspirador", nome: "Aspirador 2 em 1", preco: 200, img: "/imagens/aspirador.jpg" },
  { id: "panela", nome: "Panela de pressão elétrica", preco: 500, img: "/imagens/panela.jpg" },
  { id: "cadeira", nome: "Cadeira ergonômica", preco: 600, img: "/imagens/cadeira.jpg" },
  { id: "mixer", nome: "Mixer 3 em 1", preco: 170, img: "/imagens/mixer.jpg" },
  { id: "cristaleira", nome: "Cristaleira retrô", preco: 470, img: "/imagens/cristaleira.jpg" },
  { id: "americano", nome: "Jogo americano crochê", preco: 70, img: "/imagens/americano.jpg" },
  { id: "espelho", nome: "Espelho corpo inteiro", preco: 478, img: "/imagens/espelho.jpg" },
  { id: "jarra", nome: "Kit jarra + taças", preco: 70, img: "/imagens/jarra.jpg" },
  { id: "panificadora", nome: "Panificadora", preco: 550, img: "/imagens/panificadora.jpg" },
  { id: "chaleira", nome: "Chaleira elétrica", preco: 150, img: "/imagens/chaleira.jpg" },
  { id: "navio", nome: "Ajuda na lua de mel", preco: 1000, img: "/imagens/navio.jpg" },
  { id: "sobremesa", nome: "Taças de sobremesa", preco: 76, img: "/imagens/sobremesa.jpg" },
  { id: "processador", nome: "Multiprocessador Powerchop Philips Walita 127v", preco: 500, img: "/imagens/processador.jpg" },
  { id: "criado", nome: "Kit 2 Un Mesa de Cabeceira Sofia Estilo Industrial", preco: 352, img: "/imagens/criado.jpg" },
  { id: "lateral", nome: "Mesa Lateral para Sofá com Espelho Luxo", preco: 114, img: "/imagens/lateral.jpg" },
  { id: "organizador", nome: "Kit 4 Organizadores de Geladeira 3.8 Litros", preco: 76, img: "/imagens/organizador.jpg" },
  { id: "pote", nome: "Kit 3 a 10 Potes Herméticos 2L Dispenser Organizador Lavanderia", preco: 100, img: "/imagens/pote.jpg" },
  { id: "centro", nome: "Kit 2 Mesas De Centro Madeira Design Orgânico Sala De Estar", preco: 285, img: "/imagens/centro.jpg" },
  { id: "tv42", nome: "Samsung Smartv 42 polegadas", preco: 1500, img: "/imagens/tv42.jpg" },
  { id: "saladeira", nome: "Conjunto saladeira Ryo Maresia Areia Oxford", preco: 100, img: "/imagens/saladeira.jpg" },
  { id: "puff", nome: "Puff Dior Decorativo P/ Closet Dior Banqueta", preco: 200, img: "/imagens/puff.jpg" },
  { id: "luminaria", nome: "Luminária de Piso Abajur Chão Com Cúpula Tecido Off White", preco: 190, img: "/imagens/luminaria.jpg" },
];

export function formatarPreco(preco: number) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
