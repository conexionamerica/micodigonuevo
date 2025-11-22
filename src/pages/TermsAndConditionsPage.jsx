import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
const TermsAndConditionsPage = () => {
  return <>
      <Helmet>
        <title>Termos e Condições - Conexión América</title>
        <meta name="description" content="Conheça os termos e condições de uso dos serviços da Conexión América." />
      </Helmet>
      <div className="bg-sky-50 py-20 lg:py-28 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Termos e Condições</h1>
            <p className="text-lg text-gray-600">Leia atentamente antes de utilizar nossos serviços.</p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="bg-white p-8 rounded-xl shadow-lg prose max-w-none">
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar os serviços da Conexión América, você concorda em cumprir e estar vinculado aos seguintes termos e condições. Se você não concordar com estes termos, por favor, não utilize nossos serviços.</p>

            <h2>2. Serviços Oferecidos</h2>
            <p>A Conexión América oferece aulas de espanhol online com professores nativos, por meio de pacotes de aulas. Todos os detalhes dos pacotes, incluindo preços, número de aulas e recursos, estão disponíveis na página de "Pacotes".</p>

            <h2>3. Matrícula e Pagamento São processados através da plataforma Biolivre(MERCADO PAGO).</h2>
            <ul>
              <li>Os pagamentos são processados através da plataforma Biolivre.</li>
              <li>A matrícula em qualquer pacote é válida por 1 mês a partir da data da compra.</li>
              <li>A renovação é opcional e deve ser feita antes do término do período vigente para continuidade das aulas.</li>
            </ul>

            <h2>4. Agendamento e Cancelamento de Aulas</h2>
            <ul>
              <li>O agendamento das aulas é feito diretamente com o professor, de acordo com a disponibilidade de ambos.</li>
              <li>Cancelamentos de aulas devem ser comunicados com no mínimo 24 horas de antecedência. Aulas canceladas fora deste prazo podem ser consideradas como ministradas.</li>
            </ul>

            <h2>5. Política de Reembolso</h2>
            <p>Não oferecemos reembolso para pacotes de aulas já adquiridos, exceto em casos específicos e mediante análise da administração da Conexión América.

Direito de Arrependimento (Compras Online)
Em conformidade com o Artigo 49 do Código de Defesa do Consumidor (Lei nº 8.078/90), o consumidor que adquirir um produto ou serviço por meios não presenciais (internet, telefone ou domicílio) tem o direito de se arrepender da compra e solicitar o cancelamento.

Condições para Exercer o Direito de Arrependimento:
Prazo Legal: O aluno tem o prazo de 7 (sete) dias corridos, contados a partir da data da compra/contratação do serviço (inscrição no curso).

Solicitação: A manifestação de arrependimento deve ser formalmente comunicada à Conexion America, por meio do nosso canal de atendimento: Fale Conosco disponivel no nosso site. Não é necessário apresentar justificativa.

Restituição: Após a solicitação formal e a confirmação de que o prazo legal foi respeitado, a Conexion America providenciará a restituição integral dos valores pagos pelo aluno.

Prazo de Processamento: O reembolso será processado no prazo de 30 dias após a confirmação do cancelamento, utilizando-se o mesmo método de pagamento original (estorno no cartão de crédito ou depósito em conta, conforme aplicável).

Atenção: Caso o aluno tenha acessado uma quantidade significativa do conteúdo (mais de 20%) do curso ou tenha usufruído integralmente das aulas particulares contratadas dentro deste prazo, a Escola Online se reserva o direito de avaliar a aplicação do reembolso de forma proporcional, conforme a jurisprudência. No entanto, o direito integral de 7 dias prevalece sobre qualquer cláusula contratual em caso de arrependimento total da compra não utilizada.</p>

            <h2>6. Conduta do Aluno</h2>
            <p>Esperamos que todos os alunos mantenham uma conduta respeitosa e profissional durante as aulas. Comportamentos inadequados poderão resultar na suspensão dos serviços sem direito a reembolso.</p>

            <h2>7. Privacidade</h2>
            <p>Sua privacidade é importante para nós. Todas as informações pessoais coletadas serão utilizadas de acordo com nossa Política de Privacidade, disponível em uma seção dedicada.</p>

            <h2>8. Alterações nos Termos</h2>
            <p>A Conexión América reserva-se o direito de modificar estes Termos e Condições a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.</p>

            <h2>9. Contato</h2>
            <p>Para quaisquer dúvidas ou esclarecimentos, entre em contato conosco através do nosso WhatsApp.</p>
          </motion.div>
        </div>
      </div>
    </>;
};
export default TermsAndConditionsPage;