# Site — Lucas Rios Palestras

Site estático (HTML + CSS + JS), sem build. Pronto para GitHub + Vercel.

## Antes de publicar (5 minutos)

1. **WhatsApp** — abra `script.js` e preencha `WHATSAPP_NUMERO` (ex.: `"5545999998888"`).
   Assim todos os botões abrem o WhatsApp com a mensagem já escrita.
   Sem o número, o site usa o link wa.me/message do Instagram e copia a mensagem para o visitante colar.
2. **Domínio** — o site usa palestras.lucasrioshipnoterapeuta.com (CNAME no Cloudflare apontando para a Vercel, proxy desligado).
3. **Fotos** — as imagens em `img/` foram recortadas de prints do Instagram. Substitua pelos
   arquivos originais (mesmo nome) para ficar com qualidade máxima. Tamanho ideal: até 1600 px de largura, JPG ~80%.

## Publicar
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. Na Vercel: **Add New → Project → Import** o repositório → Framework: **Other** → Deploy.
3. Em **Settings → Domains**, conecte seu domínio.

## Onde editar
- Textos: `index.html` (cada seção está marcada com um comentário `====`).
- Cores e fontes: topo de `styles.css` (`:root`).
- Depoimentos: copie o bloco `<blockquote>` na seção Depoimentos.
- Instituições atendidas: lista dentro de `.marquee__track` (repita cada item duas vezes, a segunda com `aria-hidden="true"`).
