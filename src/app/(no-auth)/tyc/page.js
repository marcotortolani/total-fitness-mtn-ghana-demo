import React from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['400', '500', '600'],
  display: 'swap',
  fallback: ['sans-serif'],
})

export default async function Page() {
  return (
    <main
      className={` relative z-20 mt-14 md:mb-10 md:mt-40 w-full max-w-screen-xl overflow-y-hidden h-full min-h-screen px-6 py-20 bg-White text-Black flex flex-col items-center gap-4 md:rounded-xl`}
    >
      <div className=" relative w-full lg:max-w-4xl flex flex-col items-center gap-8">
        <section className="w-full flex flex-col gap-4">
          <TitleStyled>Termos e Condições</TitleStyled>
          <ParagraphStyled>
            Neste documento são estabelecidos os termos e condições que regulam
            o uso do serviço denominado "Total Fitness" (doravante o "Serviço"
            ou a "Opção de entretenimento") oferecido pela MOOB MEDIA BUSINESS,
            C.A (o "Prestador"), por meio das quais os usuários de XXXXXX –
            (doravante a "Operadora") poderão acessar desde seu dispositivo
            móvel, Tablet, laptop ou PC, a conteúdo dedicado de fitness, onde
            poderá desfrutar de novidades, vídeos, rotinas e dicas de personal
            trainers.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>O SERVIÇO: Total Fitness</Title2Styled>
          <ParagraphStyled>
            Total Fitness é um serviço de entretenimento que permite ao cliente
            acessar, através de um celular, Tablet ou computador, conteúdo de
            fitness, onde poderá desfrutar de novidades, vídeos, rotinas e dicas
            de personal trainers, nas condições que se detalham nestes Termos e
            Condições.
          </ParagraphStyled>
          <ParagraphStyled>
            Nesse sentido, todos aqueles clientes XXXXX que assim desejarem
            poderão se inscrever solicitando sua ativação na opção de
            entretenimento mediante o envio de um SMS com o comando que se
            considere como válido para tal ação ao número XXXX (o preço da
            mensagem é equivalente a uma mensagem de texto por uso).
          </ParagraphStyled>
          <ParagraphStyled>
            Ao enviar a palavra{' '}
            <span className=" font-semibold">
              ATIVAR, ou o comando que se comunique para esta ação, ao número
              XXXX
            </span>
            , o cliente receberá um SMS com o link e instruções de acesso ao
            portal, preço do serviço, frequência de cobrança e um pin para
            acessar a opção de entretenimento. Uma vez que ingresse, poderá
            desfrutar sem limites de todo o conteúdo que oferece o Total
            Fitness. As taxas por navegação e transmissão de dados não estão
            incluídas no serviço. Os usuários também poderão se inscrever
            através da página web de XXXXX, na seção opções de entretenimento
            digital, selecionando a opção de Total Fitness, através da URL
            própria do serviço{' '}
            <Link className=" text-sky-600 " href="/" target="_blank">
              Total Fitness
            </Link>{' '}
            ou desde qualquer outra seção que a operadora disponha para isso.
          </ParagraphStyled>
          <ParagraphStyled>
            O Serviço é prestado mediante a modalidade de assinatura de
            renovação diária, ou seja, de forma contínua desde a ativação do
            serviço por parte do usuário, e até o momento em que este deseja
            solicitar a desativação do serviço. Para cancelar a assinatura o
            usuário deve enviar a palavra{' '}
            <span className=" font-semibold">CANCELAR ao número XXXX</span> e
            este receberá uma mensagem de confirmação.
          </ParagraphStyled>
          <ParagraphStyled>
            É requisito indispensável para a utilização da assinatura que o
            usuário possua os serviços SMS e dados móveis ou WiFi ativados, um
            telefone móvel compatível e corretamente configurado. Os usuários
            deverão comprovar estes aspectos de forma prévia à solicitação do
            serviço.
          </ParagraphStyled>
          <ParagraphStyled>
            Total Fitness enviará do número XXXX uma mensagem de texto com a
            informação de acesso ao portal e o preço pelo menos uma vez por mês.
            Adicionalmente, Total Fitness enviará ao usuário mensagens de texto
            com informação relevante nos períodos onde se efetuem sorteios,
            premiações e/ou atividades de interesse para o segmento.
          </ParagraphStyled>
          <ParagraphStyled>
            O uso do Serviço estará sujeito à aceitação e cumprimento dos
            presentes Termos e Condições, que se dá desde o momento que o
            cliente se inscreve no serviço. Também resultarão aplicáveis todas
            aquelas condições particulares, avisos ou instruções de
            funcionamento que se ponham em conhecimento do usuário através da
            página web de XXXXX ou do Prestador, com relação ao Serviço.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Alcance do serviço</Title2Styled>
          <ParagraphStyled>
            O Serviço está disponível em todo o Brasil, para toda pessoa física
            capaz de contratar, cuja linha telefônica móvel se encontre ativa no
            momento de solicitação de ATIVAÇÃO do mesmo.
          </ParagraphStyled>
          <ParagraphStyled>
            O conteúdo estará disponível para ser visualizado pelo usuário, a
            partir do momento em que este realize com sucesso sua ativação. O
            conteúdo poderá ser visualizado desde qualquer terminal compatível,
            requerendo dados móveis ou uma conexão WiFi para isso.
          </ParagraphStyled>
          <ParagraphStyled>
            Todo Usuário que se inscreva no serviço e efetue os passos de
            autenticação necessários, declara e garante dar pleno cumprimento
            aos presentes Termos e Condições.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Condições de uso. Propriedade intelectual</Title2Styled>
          <ParagraphStyled>
            Os usuários se obrigam a realizar um uso lícito do Serviço e do
            conteúdo ao qual acessem como consequência da Assinatura, de
            conformidade com a lei vigente aplicável e os presentes Termos e
            Condições. Corresponde aos Usuários respeitar as normas mencionadas,
            colocando especial ênfase nos direitos de propriedade intelectual e
            industrial, e abster-se de utilizar o Serviço com fins ilícitos ou
            de tal forma que atentem ou vulnerem direitos de terceiros ou do
            Prestador. Os Usuários serão exclusivos responsáveis pelos danos ou
            prejuízos de qualquer natureza que pudessem derivar do uso
            incorreto, ilegítimo ou ilícito do Serviço.
          </ParagraphStyled>
          <ParagraphStyled>
            O Prestador é único titular do conteúdo, e/ou recebeu dos
            respectivos titulares de dito conteúdo uma licença de uso. Todo o
            conteúdo que compõe a Assinatura está protegido por direitos de
            autor no marco da normativa vigente. O conteúdo pode ser utilizado
            pelos Usuários somente na medida permitida por estes Termos e
            Condições e a legislação aplicável.
          </ParagraphStyled>
          <ParagraphStyled>
            A menos que se especifique expressamente o contrário, o conteúdo não
            poderá ser baixado nos dispositivos dos usuários.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Responsabilidade</Title2Styled>
          <ParagraphStyled>
            A responsabilidade e obrigação de pagamento pelo envio ou recepção
            de mensagens de texto relacionadas à Assinatura será
            responsabilidade do titular do número móvel utilizado para tal fim,
            e não poderá opor-se por{' '}
            <span className=" font-semibold">
              perda, furto, roubo, extravio ou avaria de dito equipamento móvel
            </span>
            , salvo denúncia prévia a qualquer envio ou recepção destas
            mensagens, efetuada à Operadora através dos centros de atendimento
            desta última.
          </ParagraphStyled>
          <ParagraphStyled>
            O Prestador e a Operadora não poderão ser considerados responsáveis
            por nenhum dano ou prejuízo ocasionado ou que pudesse ocasionar-se
            aos Usuários ou a terceiros, em suas pessoas ou bens, pela
            contratação ou utilização do Serviço. Tampouco serão responsáveis em
            caso de insatisfação pelo conteúdo do serviço. Para estes casos, os
            usuários serão livres para cancelar a assinatura, enviando a palavra{' '}
            <span className=" font-semibold">CANCELAR ao número XXXX</span>.
          </ParagraphStyled>
          <ParagraphStyled>
            O Prestador não se responsabiliza por aquelas Assinaturas que não
            contenham os dados solicitados ou que contenham dados errôneos nem
            pelas mensagens de texto que não incluam as palavras chave
            estabelecidas para o acesso ao Serviço. Tampouco será responsável
            pelas solicitações ou envios que não sejam aceitos pela plataforma
            tecnológica do Prestador nem por atrasos que pudessem sofrer as
            visualizações de conteúdo, mensagens de texto ou qualquer outro
            envio relacionado com a Assinatura, por qualquer causa não imputável
            ao Prestador, incluindo mas sem limitar-se a falhas na conectividade
            da rede, excesso ou saturação do tráfego da rede, e/ou qualquer
            característica dos telefones móveis que impeçam a transmissão de
            ditos envios ou solicitações.
          </ParagraphStyled>
          <ParagraphStyled>
            O Prestador se reserva o direito de efetuar sem aviso prévio todo
            tipo de modificação na mecânica da Assinatura com o único requisito
            de comunicar qualquer mudança de relevância na página web e outros
            meios.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Jurisdição</Title2Styled>
          <ParagraphStyled>
            Toda relação que em virtude deste Serviço se gere entre os Usuários
            e o Prestador será regida e acordada em total sujeição às leis do
            Brasil, renunciando os Usuários a qualquer outra lei a cuja
            aplicação pudessem ter direito.
          </ParagraphStyled>
          <ParagraphStyled>
            Estes Termos e Condições se regem pela lei do Brasil. Para qualquer
            controvérsia que pudesse derivar da prestação dos Serviços ou a
            interpretação e aplicação dos Termos e Condições, o Prestador e os
            Usuários aceitam submeter-se aos tribunais competentes do Brasil com
            expressa renúncia a qualquer outro foro ou jurisdição que pudesse
            corresponder-lhes.
          </ParagraphStyled>
        </section>
      </div>
    </main>
  )
}

const TitleStyled = ({ children }) => (
  <h1
    className={
      ' w-full uppercase font-oswaldItalic pointer-events-none cursor-default text-[1.8rem] leading-[2rem] md:text-3xl lg:text-4xl text-Black text-left  '
    }
  >
    {children}
  </h1>
)

const Title2Styled = ({ children }) => (
  <h2
    className={` w-full md:max-w-full font-oswaldItalic uppercase  text-Black text-xl md:text-lg lg:text-2xl`}
  >
    {children}
  </h2>
)

const ParagraphStyled = ({ children }) => (
  <p
    className={
      poppins.className +
      ' font-normal text-sm md:text-base lg:text-lg text-Black'
    }
  >
    {children}
  </p>
)
