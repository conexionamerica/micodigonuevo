# 🎯 Tutorial Completo: Crear Primera Campaña Google Ads

## ✅ PREPARACIÓN COMPLETADA

Ya he configurado:
- ✅ Componente de rastreo de conversiones (`GoogleAdsConversion.jsx`)
- ✅ Integración con botón de WhatsApp
- ✅ Tracking automático de clics

**Ahora solo necesitas:**
1. Crear la cuenta de Google Ads
2. Obtener el ID de conversión
3. Actualizar el componente
4. Crear tu primera campaña

---

## 📋 PASO 1: Crear Cuenta Google Ads (10 min)

### **1.1 Acceder**
1. Ve a: **https://ads.google.com**
2. Clic en **"Começar agora"**
3. Inicia sesión con tu Gmail

### **1.2 Modo Especialista**
⚠️ **MUY IMPORTANTE:**
- Cuando te pregunte cómo configurar, selecciona: **"Alternar para o modo Especialista"**
- Luego: **"Criar uma conta sem campanha"**

### **1.3 Información de Facturación**
- **País:** Brasil
- **Zona horaria:** (GMT-03:00) Brasília
- **Moneda:** BRL (Real brasileño) ⚠️ **NO SE PUEDE CAMBIAR DESPUÉS**

---

## 📊 PASO 2: Configurar Conversión (15 min)

### **2.1 Ir a Conversiones**
1. Menú superior → **"Ferramentas e configurações"** (ícono llave 🔧)
2. Columna **"Medição"** → **"Conversões"**
3. Botón azul **"+ Nova ação de conversão"**

### **2.2 Configurar Conversión**
1. **Selecciona:** Website
2. **URL del sitio:** www.conexionamerica.com.br
3. Clic en **"Verificar"**

### **2.3 Detalles de la Conversión**

**Categoría:** Envio de formulário de contato

**Nome da conversão:** Clique WhatsApp

**Valor:**
- Selecciona: "Usar o mesmo valor para cada conversão"
- Valor: R$ 50

**Contagem:**
- Selecciona: "Uma" (solo contar una vez)

**Janela de conversão de cliques:** 30 dias

**Janela de conversão de visualizações:** 1 dia

Clic en **"Criar e continuar"**

### **2.4 Copiar Código**

Te mostrará un código como este:

```html
<!-- Event snippet for Clique WhatsApp conversion page -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'AW-123456789/AbC-dEfGhIjKlMnOpQrS',
      'value': 50.0,
      'currency': 'BRL'
  });
</script>
```

**IMPORTANTE:** Copia estos dos valores:
- **ID de conversión:** `AW-123456789` (la parte antes del `/`)
- **Label de conversión:** `AbC-dEfGhIjKlMnOpQrS` (la parte después del `/`)

### **2.5 Actualizar Código**

Abre el archivo: `src/components/GoogleAdsConversion.jsx`

Reemplaza en las líneas 12-13:

```javascript
const CONVERSION_ID = 'AW-123456789'; // ⚠️ TU ID AQUÍ
const CONVERSION_LABEL = 'AbC-dEfGhIjKlMnOpQrS'; // ⚠️ TU LABEL AQUÍ
```

**¡Listo!** Ahora cada clic en WhatsApp se rastreará como conversión.

---

## 🚀 PASO 3: Crear Primera Campaña (20 min)

### **3.1 Iniciar Nueva Campaña**
1. En el menú izquierdo → **"Campanhas"**
2. Botón azul **"+ Nova campanha"**

### **3.2 Objetivo de la Campaña**
- Selecciona: **"Leads"**
- Clic en **"Continuar"**

### **3.3 Tipo de Campaña**
- Selecciona: **"Pesquisa"**
- Clic en **"Continuar"**

### **3.4 Formas de Alcanzar el Objetivo**
- Selecciona: **"Visitas ao site"**
- URL: `https://www.conexionamerica.com.br/pacotes`
- Clic en **"Continuar"**

### **3.5 Configuraciones de Campaña**

**Nome da campanha:** Curso Espanhol - Pesquisa

**Redes:**
- ✅ Rede de Pesquisa do Google
- ❌ Desmarcar: Parceiros de pesquisa do Google

**Locais:**
- Remover "Brasil" si está
- Clic en **"Inserir outro local"**
- Agregar:
  - São Paulo
  - Rio de Janeiro
  - Belo Horizonte
  - Brasília
  - Curitiba
  - Porto Alegre

**Idiomas:**
- Português

**Público:**
- Por ahora, dejar en blanco (lo configuraremos después)

**Orçamento e lances:**
- **Orçamento diário:** R$ 20
- **Lances:** Selecciona "Cliques" (Maximizar cliques)

Clic en **"Avançar"**

---

## 📝 PASO 4: Crear Grupos de Anúncios

### **GRUPO 1: Curso Online**

**Nome do grupo de anúncios:** Curso Online

**Lance padrão:** R$ 2,00

#### **Palavras-chave:**

Agrega estas palabras (una por línea):

```
[curso de espanhol online]
[curso espanhol online]
"curso de espanhol online"
+curso +espanhol +online
```

**Tipo de correspondência:**
- `[palavra]` = Exata
- `"palavra"` = Frase
- `+palavra` = Ampla modificada

#### **Anúncio 1:**

**URL final:** https://www.conexionamerica.com.br/pacotes

**Caminho 1:** Curso-Online
**Caminho 2:** Professores-Nativos

**Títulos (15):**
1. Curso de Espanhol Online
2. Professores Nativos | Ao Vivo
3. A partir de R$9 por Aula

**Descrições (2):**
1. Aprenda espanhol com professores nativos. Aulas ao vivo personalizadas, horários flexíveis. Teste grátis disponível!

2. Metodologia comprovada. Certificação internacional. Suporte 24/7. Mais de 500 alunos satisfeitos. Comece hoje!

#### **Anúncio 2:**

**URL final:** https://www.conexionamerica.com.br/pacotes

**Caminho 1:** Aulas-ao-Vivo
**Caminho 2:** Teste-Gratis

**Títulos:**
1. Espanhol Online com Nativos
2. Aulas ao Vivo Personalizadas
3. Teste Grátis | Sem Compromisso

**Descrições:**
1. Alcance a fluência em espanhol com nossa metodologia exclusiva. Professores nativos experientes e certificados.

2. Pacotes flexíveis a partir de R$9/aula. Horários que se adaptam à sua rotina. Comece sua jornada hoje!

#### **Anúncio 3:**

**URL final:** https://www.conexionamerica.com.br/pacotes

**Caminho 1:** Espanhol-Online
**Caminho 2:** Certificacao

**Títulos:**
1. Aprenda Espanhol Online
2. Certificação Internacional
3. Professores Nativos Certificados

**Descrições:**
1. Curso de espanhol online com aulas ao vivo. Metodologia personalizada para cada aluno. Resultados garantidos.

2. Horários flexíveis. Suporte completo via WhatsApp. Certificação reconhecida internacionalmente. Teste grátis!

---

### **GRUPO 2: Professor Nativo**

**Nome do grupo de anúncios:** Professor Nativo

**Lance padrão:** R$ 1,50

#### **Palavras-chave:**

```
[professor nativo espanhol]
[aulas com professor nativo]
"professor de espanhol nativo"
+professor +nativo +espanhol
```

#### **Anúncios:**

Crear 3 anúncios similares a los anteriores, pero enfocados en "professores nativos"

**Ejemplo Título 1:**
1. Professores Nativos de Espanhol
2. Aulas ao Vivo Personalizadas
3. Teste Grátis Disponível

---

### **GRUPO 3: Aulas ao Vivo**

**Nome do grupo de anúncios:** Aulas ao Vivo

**Lance padrão:** R$ 1,80

#### **Palavras-chave:**

```
[aulas de espanhol ao vivo]
[curso espanhol ao vivo]
"aulas particulares espanhol online"
+aulas +espanhol +ao +vivo
```

#### **Anúncios:**

Crear 3 anúncios enfocados en "aulas ao vivo"

---

## 🎯 PASO 5: Extensões de Anúncio

### **5.1 Sitelinks**

En la campaña, ir a **"Anúncios e extensões"** → **"Extensões"**

**Sitelink 1:**
- Texto: Nossos Pacotes
- URL: https://www.conexionamerica.com.br/pacotes
- Descrição 1: Escolha o plano ideal para você
- Descrição 2: A partir de R$9 por aula

**Sitelink 2:**
- Texto: Professores Nativos
- URL: https://www.conexionamerica.com.br/
- Descrição 1: Conheça nossa equipe
- Descrição 2: Professores certificados

**Sitelink 3:**
- Texto: Teste Grátis
- URL: https://www.conexionamerica.com.br/
- Descrição 1: Primeira aula sem compromisso
- Descrição 2: Conheça nossa metodologia

**Sitelink 4:**
- Texto: Depoimentos
- URL: https://www.conexionamerica.com.br/
- Descrição 1: Veja o que dizem nossos alunos
- Descrição 2: Histórias de sucesso

### **5.2 Snippets Estruturados**

**Tipo:** Cursos

**Valores:**
- Espanhol Básico
- Espanhol Intermediário
- Espanhol Avançado
- Conversação
- Espanhol para Negócios

### **5.3 Chamadas**

**Chamada 1:** Aulas 100% ao Vivo
**Chamada 2:** Professores Nativos Certificados
**Chamada 3:** Horários Flexíveis
**Chamada 4:** Certificação Internacional

### **5.4 Preços**

**Tipo:** Pacotes

**Item 1:**
- Cabeçalho: Personalizado
- Preço: A partir de R$9
- Unidade: por aula
- Descrição: Você escolhe a quantidade

**Item 2:**
- Cabeçalho: Ligero
- Preço: R$219
- Unidade: por mês
- Descrição: 8 aulas por mês

**Item 3:**
- Cabeçalho: Intensivo
- Preço: R$416
- Unidade: por mês
- Descrição: 16 aulas por mês

### **5.5 Promoções**

**Promoção 1:**
- Ocasião: Oferta limitada
- Detalhes: 50% OFF no Pacote Personalizado

**Promoção 2:**
- Ocasião: Teste grátis
- Detalhes: Primeira aula sem compromisso

---

## 🔍 PASO 6: Palavras-chave Negativas

**MUY IMPORTANTE:** Agregar palabras negativas para no desperdiciar dinero.

En la campaña → **"Palavras-chave"** → **"Palavras-chave negativas"**

Agregar estas palabras:

```
gratis
gratuito
free
pirata
download
pdf
livro
app
duolingo
youtube
infantil
criança
crianças
tradução
tradutor
dicionário
emprego
vaga
trabalho
concurso
enem
vestibular
```

---

## ✅ PASO 7: Revisar y Activar

### **7.1 Checklist Final**

Antes de activar, verifica:

- [ ] Orçamento configurado: R$ 20/dia
- [ ] 3 grupos de anúncios creados
- [ ] 9 anúncios de texto (3 por grupo)
- [ ] Palavras-chave agregadas
- [ ] Palavras-chave negativas agregadas
- [ ] Extensões configuradas (sitelinks, snippets, etc)
- [ ] URLs de destino correctas
- [ ] Conversión configurada
- [ ] Código de conversión actualizado en el sitio

### **7.2 Activar Campaña**

1. Revisa todo una última vez
2. Clic en **"Publicar campanha"**
3. Agrega método de pago (tarjeta de crédito/débito)
4. Confirma

**🎉 ¡CAMPAÑA ACTIVA!**

---

## 📊 PASO 8: Monitorear Resultados

### **Primeros 3 Días:**

Verifica diariamente:
- Impressões (cuántas veces apareció tu anúncio)
- Cliques (cuántos clicaron)
- CTR (taxa de clique) - Meta: >3%
- CPC (cuánto pagas por clic) - Meta: R$ 1-3

### **Primera Semana:**

- [ ] Revisar palavras de pesquisa (qué buscaron las personas)
- [ ] Agregar más palavras-chave negativas
- [ ] Pausar anúncios con CTR < 2%
- [ ] Aumentar lance en palavras que convierten

### **Primer Mes:**

- [ ] Calcular CPA (cuánto pagas por conversión)
- [ ] Identificar mejor grupo de anúncios
- [ ] Redistribuir orçamento
- [ ] Crear nuevos anúncios (A/B testing)

---

## 💰 Proyección de Resultados

### **Con R$ 20/día (R$ 600/mês):**

**Estimativa conservadora:**
- Impressões: 10.000-15.000/mês
- Cliques: 300-400/mês
- CTR: 3-4%
- CPC médio: R$ 1,50-2,00
- Conversões: 15-25/mês
- CPA: R$ 24-40

**ROI esperado:**
- Si 1 de cada 5 leads se convierte en alumno
- Precio promedio del paquete: R$ 300
- Alunos nuevos: 3-5/mês
- Facturación: R$ 900-1500/mês
- ROI: 50-150%

---

## 🎯 Optimizaciones Recomendadas

### **Semana 2:**
- Crear anúncios de remarketing
- Testar diferentes CTAs
- Ajustar lances por dispositivo

### **Semana 3:**
- Agregar extensões de localização
- Testar diferentes landing pages
- Crear público personalizado

### **Semana 4:**
- Expandir para Rede de Display
- Crear campanha de vídeo (YouTube)
- Testar Facebook Ads

---

## 🚨 Errores Comunes a Evitar

❌ **No monitorear diariamente** (primeros 7 días)
❌ **No agregar palavras-chave negativas**
❌ **Enviar todo a la homepage** (usa /pacotes)
❌ **No testar diferentes anúncios**
❌ **Gastar todo el presupuesto sin analizar**
❌ **No rastrear conversões**
❌ **Configurar y olvidar**

---

## 📞 Soporte

Si tienes dudas:
1. Centro de Ajuda do Google Ads: https://support.google.com/google-ads
2. Chat de suporte (dentro de Google Ads)
3. Comunidad r/PPC en Reddit
4. ¡Pregúntame!

---

## ✅ Próximos Pasos

Después de 30 días con esta campaña:

1. **Crear Campanha de Display** (remarketing)
2. **Expandir para YouTube Ads**
3. **Testar Facebook/Instagram Ads**
4. **Crear Landing Page específica**
5. **Implementar Chat ao Vivo**

---

## 🎉 ¡Estás Listo!

Tienes todo lo necesario para lanzar tu primera campaña de Google Ads.

**Recuerda:**
- Empieza con presupuesto bajo
- Monitorea constantemente
- Optimiza basado en datos
- Ten paciencia (resultados en 2-4 semanas)

**¡Mucho éxito! 🚀**

---

**Fecha de creación:** 11 de diciembre de 2025
**Versión:** 1.0
