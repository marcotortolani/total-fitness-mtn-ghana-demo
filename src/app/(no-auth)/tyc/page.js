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
          <TitleStyled>Terms and Conditions</TitleStyled>
          <ParagraphStyled>
            This document sets forth the terms and conditions that govern the
            use of the service called “Total Fitness” (hereinafter referred to
            as the “Service” or the “Entertainment Option”) offered by MOOB
            MEDIA BUSINESS, C.A (the “Provider”), through which users of XXXXXX
            – (hereinafter the “Operator”) may access from their mobile device,
            tablet, laptop or PC, dedicated fitness content, where they can
            enjoy updates, videos, routines and tips from personal trainers.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>THE SERVICE: Total Fitness</Title2Styled>
          <ParagraphStyled>
            Total Fitness is an entertainment service that allows the customer
            to access fitness content via mobile phone, tablet or computer,
            where they can enjoy updates, videos, routines and tips from
            personal trainers, under the conditions detailed in these Terms and
            Conditions.
          </ParagraphStyled>
          <ParagraphStyled>
            In this regard, all XXXXX customers who so wish may subscribe by
            requesting their enrollment in the entertainment option by sending
            an SMS with the command considered valid for such action to the
            number XXXX (the cost of the message is equivalent to a standard
            text message per use).
          </ParagraphStyled>
          <ParagraphStyled>
            By sending the word{' '}
            <span className=" font-semibold">
              ALTA, or the command communicated for this action, to the number
              XXXX
            </span>
            , the customer will receive an SMS with the link and instructions to
            access the portal, the service price, billing frequency and a PIN to
            access the entertainment option. Once logged in, they will be able
            to enjoy all the content offered by Total Fitness without limits.
            Data browsing and transmission charges are not included in the
            service. Users may also subscribe through the XXXXX website, in the
            digital entertainment options section, by selecting the Total
            Fitness option, through the service’s own URL{' '}
            <Link className=" text-sky-600 " href="/" target="_blank">
              Total Fitness
            </Link>{' '}
            or from any other section the operator provides for that purpose.
          </ParagraphStyled>
          <ParagraphStyled>
            The Service is provided under a daily renewal subscription model,
            i.e., on a continuous basis from the activation of the service by
            the user, until the moment the user wishes to request deactivation
            of the service. To unsubscribe, the user must send the word{' '}
            <span className=" font-semibold">BAJA to the number XXXX</span> and
            will receive a confirmation message.
          </ParagraphStyled>
          <ParagraphStyled>
            It is an essential requirement for the use of the subscription that
            the user has SMS and mobile data or WiFi services enabled, a
            compatible and properly configured mobile phone. Users must check
            these aspects prior to requesting the service.
          </ParagraphStyled>
          <ParagraphStyled>
            Total Fitness will send from the number XXXX a text message with the
            access information to the portal and the price at least once a
            month. In addition, Total Fitness will send users text messages with
            relevant information during periods when sweepstakes, awards and/or
            activities of interest to the segment are held.
          </ParagraphStyled>
          <ParagraphStyled>
            Use of the Service will be subject to acceptance and compliance with
            these Terms and Conditions, effective from the moment the customer
            subscribes to the service. Also applicable will be any particular
            conditions, notices or operating instructions made known to the user
            through the XXXXX website or by the Provider, in relation to the
            Service.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Scope of the Service</Title2Styled>
          <ParagraphStyled>
            The Service is available throughout Spain, for any natural person
            capable of contracting, whose mobile phone line is active at the
            time of requesting ALTA to it.
          </ParagraphStyled>
          <ParagraphStyled>
            The content will be available for the user to view from the moment
            they successfully complete their enrollment. The content may be
            viewed from any compatible device, requiring mobile data or a WiFi
            connection.
          </ParagraphStyled>
          <ParagraphStyled>
            Any User who subscribes to the service and completes the necessary
            authentication steps declares and warrants full compliance with
            these Terms and Conditions.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Conditions of Use. Intellectual Property</Title2Styled>
          <ParagraphStyled>
            Users agree to use the Service and the content accessed as a result
            of the Subscription lawfully, in accordance with applicable law and
            these Terms and Conditions. Users must respect the aforementioned
            rules, with special emphasis on intellectual and industrial property
            rights, and refrain from using the Service for illegal purposes or
            in a way that infringes or violates the rights of third parties or
            the Provider. Users shall be solely responsible for any damage or
            harm of any kind that may result from the incorrect, illegitimate or
            unlawful use of the Service.
          </ParagraphStyled>
          <ParagraphStyled>
            The Provider is the sole owner of the content, and/or has received a
            usage license from the respective content owners. All content that
            makes up the Subscription is protected by copyright under current
            regulations. The content may be used by Users only to the extent
            permitted by these Terms and Conditions and applicable law.
          </ParagraphStyled>
          <ParagraphStyled>
            Unless expressly stated otherwise, content may not be downloaded to
            users’ devices.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Liability</Title2Styled>
          <ParagraphStyled>
            The responsibility and obligation to pay for the sending or
            receiving of text messages related to the Subscription shall lie
            with the holder of the mobile number used for this purpose, and
            cannot be contested due to{' '}
            <span className=" font-semibold">
              loss, theft, misplacement or malfunction of said mobile device
            </span>
            , except in cases where prior notice is given before any sending or
            receiving of such messages, made to the Operator through its
            customer service centers.
          </ParagraphStyled>
          <ParagraphStyled>
            The Provider and the Operator shall not be held liable for any
            damage or harm caused or that may be caused to Users or third
            parties, in their persons or property, by contracting or using the
            Service. Nor shall they be liable in case of dissatisfaction with
            the content of the service. In such cases, users will be free to
            unsubscribe by sending the word{' '}
            <span className=" font-semibold">BAJA to the number XXXX</span>.
          </ParagraphStyled>
          <ParagraphStyled>
            The Provider is not responsible for Subscriptions that do not
            contain the required information or that contain erroneous data, nor
            for text messages that do not include the keywords established for
            access to the Service. It shall also not be responsible for requests
            or submissions not accepted by the Provider’s technological
            platform, nor for delays in the display of content, text messages or
            any other sending related to the Subscription, for any reason not
            attributable to the Provider, including but not limited to network
            connectivity failures, excessive or saturated network traffic,
            and/or any mobile phone features that prevent the transmission of
            such submissions or requests.
          </ParagraphStyled>
          <ParagraphStyled>
            The Provider reserves the right to make, without prior notice, any
            type of modification to the Subscription mechanics, with the sole
            requirement of communicating any relevant changes on the website and
            other media.
          </ParagraphStyled>
        </section>
        <section className=" w-full flex flex-col gap-4">
          <Title2Styled>Jurisdiction</Title2Styled>
          <ParagraphStyled>
            Any relationship that arises between Users and the Provider by
            virtue of this Service shall be governed and executed in full
            compliance with the laws of Spain, with Users waiving any other law
            that may apply.
          </ParagraphStyled>
          <ParagraphStyled>
            These Terms and Conditions are governed by the law of Spain. For any
            dispute that may arise from the provision of the Services or the
            interpretation and application of the Terms and Conditions, the
            Provider and the Users agree to submit to the competent courts of
            Spain, expressly waiving any other jurisdiction that may apply to
            them.
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
