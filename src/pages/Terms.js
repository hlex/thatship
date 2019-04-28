import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper, Title, Ocean } from "../components";

const Credit = ({ history }) => {
  const handleGoToMenu = () => {
    history.push("/menu");
  };

  return (
    <div className="terms-page">
      <div className="container">
        <MainContent>
          <div className="announcement">
            <Paper
              onClose={handleGoToMenu}
              renderHeader={
                <Title>
                  <h1 className="_text-center">
                    General terms and conditions for using the site's services
                  </h1>
                </Title>
              }
              renderBody={
                <div className="_text-justify _bold overflow-y">
                  <h3 className="_bold">Article 1 - Legal Information</h3>
                  <p>'That Ship Has Sailed' site is the property of Chantchanok Chantpakpimon, whose registered office is located at:</p>
                  <p>
                    Tel: +66 8 3 299 2999
                    <br />
                    E-mail: chantchanokch@gmail.com
                  </p>
                  <p>‘The Ship Has Sailed’ This idea encapsulates the lost opportunity - a
                  situation we no longer have the power to change. But it can also suggest
                  the possibility for comfort and freedom in letting go, acknowledging
                  what has passed forever. ‘The Ship Has Sailed’ site will give people the
                  opportunity to write their regrets - whether about family, career, love,
                  ‘bucket list’ goals or anything else - and send it out into the wide,
                  dark space of the internet, in a sea of other people’s memories, grief
                  and loss. By doing this mindful, thoughtful exercise, people can achieve
                  a kind of ‘catharsis’ by verbalising and recognising their loss, holding
                  it in words before they let it drift away from them. Users can take
                  comfort knowing they are not alone as they share this experience with
                  people around the world, and hopefully find peace and freedom in the
                  act.
                  </p>
                  <br />

                  <h3 className="_bold">Article 2 - Acceptance of the terms of use</h3>
                  <p>'That Ship Has Sailed' site (hereinafter “the Service”) allows you to confess a few lines of the regret you have and sail it away in a sea of other people’s memories, grief and loss.</p>
                  <p>Any use of the Service supposes that the User undertakes to respect these terms of use (hereinafter the “Terms of Use”).</p>
                  <p>The owner may, without being required to, remove, modify, block or monitor the Content or the accounts containing a content that it may deem, at its complete discretion, to be in violation of these Terms of Use.</p>
                  <p>You acknowledge that the owner is not responsible for the behaviour of the users.</p>
                  <p>If you access the 'That Ship Has Sailed' site from a nation other than Thailand, you also undertake to respect the local applicable law.</p>

                  <br />
                  <h3 className="_bold">Article 3 - Terms of use of the service</h3>
                  <p>3.1. You must be at least eighteen years of age to use the service.</p>
                  <p>3.2. You are not authorised to publish, via the Service, scenes of partial or total nudity, nor photos or other content with a nature that is discriminatory, illicit, fraudulent, hateful, pornographic or sexually suggestive.</p>
                  <p>3.3. You may not defame, persecute, intimidate, harass or threaten persons or entities, nor usurp their identity. Moreover, you may not publish private or confidential information via the Service (including, but not limited to, credit card details, social security numbers, identity card numbers, private telephone numbers and electronic addresses that belong to you or that belong to third parties).</p>
                  <p>3.4. You are not authorised to use the Service for illicit or forbidden purposes. You agree that you will obey all laws, rules and regulations that apply to your use of the Service and of your Content, in particular copyrights..</p>
                  <p>3.5. You are the sole person responsible for your behaviour and for all the data, texts, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, original creations, applications, links and other contents or media (hereinafter referred to collectively as the “Content”) that you submit, publish or post on or through the Service.</p>
                  <p>3.6. You may not interfere with the functioning of the Service, the servers or networks connected to the Service, in particular by transmitting viruses, spy software, malware or any other code that is damaging or destructive. You may not inject content or code in the pages of 'That Ship Has Sailed', you may not modify them and you may not interfere with their functioning or their posting in the navigator or on the users’ peripheral devices.</p>
                  <p>3.7. Any violation of these Terms of Use may entail, at the sole discretion of 'That Ship Has Sailed', the removal of your photo. </p>
                  <p>3.8. You understand and accept the fact that the owner cannot be held responsible for the Content published on the Service and that you use the Service at your own risk.</p>
                  <br />

                  <h3 className="_bold">Article 4 - Contents of the site</h3>
                  <h4>
                    4.1 – Content published by internet users
                  </h4>
                  <p>
                    The owner of ‘That Ship Has Sailed' does not claim to be the owner of the Content that you publish on or through the Service. Nevertheless, you hereby grant the owner a licence that is non-exclusive, free of charge, copyright free, transferable, sub-licensable and global for the use of the Content that you publish on or through the Service.
                  </p>
                  <p>
                    You represent and guarantee that:
                  </p>
                  <p>
                    You are the owner of the Content that you publish on or through the Service, or that you are authorised to grant the rights and licences mentioned in these Terms of Use;
                  </p>
                  <p>
                    (ii) the publication and the use of your Content on or through the Service does not infringe, divert or violate the rights of third parties, including but not limited to, the rights to respect of private life, publicity rights, copyrights, commercial trademarks and other intellectual property rights;
                  </p>
                  <p>
                    (iii) you agree to pay all fees, copyrights and other sums owing in relation to the Content that you publish on or through the Service; and
                  </p>
                  <p>
                    (iv) that you have the right and capacity to enter into these Terms of Use in your jurisdiction.
                  </p>
                  <p>
                    You accept the fact that the owner is not responsible for the Content published on the Service and does not answer for it.
                  </p>
                  <p>
                    The owner reserves the right to pre-select, monitor, edit or remove the Content. If your Content violates these Terms of use, you may be held legally responsible for the Content.
                  </p>
                  <h4>
                    4.2 – Use of the content
                  </h4>
                  <p>
                    The owner reserves the right to use the souvenirs collected on the site for an operation to be defined later. In the event of use of the content for other purposes than the site itself, the owner will contact the author of the photo to request the rights of use from him.
                  </p>
                  <h4>
                    4.3 – Intellectual property of the 'That Ship Has Sailed' site
                  </h4>
                  <p>
                    Trademarks and logos (semi-figurative trademarks) of the owner used on the site are registered trademarks. Any reproduction or representation, whole or partial, alone or integrated with other elements, without the prior, express and written authorisation of the owner is strictly forbidden.
                  </p>
                  <p>
                    The general structure, software, texts, images, videos, sounds, know-how, animations, and more generally all the information and content included on the 'That Ship Has Sailed' site are the property of the owner, or are subject to rights of use or operation. These items are subject to laws protecting copyrights.
                  </p>
                  <p>
                    Any representation, modification, reproduction, adulteration, total or partial, of all or part of the site or of its content, by any procedure, and on any medium, would constitute counterfeiting sanctioned by Articles L.335-2 et seq. of the Intellectual Property Code.
                  </p>
                  <p>
                    The owner reserves the right to remove immediately, and without prior formal notice, any content: message, text, image, graph that may violate the laws and regulations in effect, and in particular the regulations specified above.
                  </p>
                  <br />

                  <h3 className="_bold">Article 5 - Contents of the site</h3>
                  <p>The data collected in the context of the 'That Ship Has Sailed' site will be processed electronically.</p>
                  <p>The information requested is necessary for processing participation in the Service. These data will be stored in the owner’s database, for information and commercial prospecting purposes by the user, subject to their prior consent.</p>
                  <p>Personal data collected on the Site have been subject to a declaration to the owner. You have, in conformity with the “information technology and freedom” law of 6 January 1978, a right to access, to correct and to modify and remove data concerning you. You may exercise this right by contacting our webmaster by e-mail at the following address: chantchanokch@gmail.com or by letter.</p>
                  <br />

                  <h3 className="_bold">Article 6 - Contents of the site</h3>
                  <p>The 'That Ship Has Sailed' Site is accessible free of charge to any person having internet access (computer and/or mobile phone). All the costs related to access to the Site, whether these are costs for materials, software or internet access, are exclusively at the expense of the internet user. He is the sole party responsible for the proper functioning of his computer equipment and Internet access.</p>
                  <p>To benefit from the Services, the internet user must also have a valid Facebook account, either directly or through a service provider or a service provider having access to the Internet. </p>
                  <p>The User, who accesses the Service, declares that he accepts the characteristics and limits of the internet and, in particular, he acknowledges that:</p>
                  <ul className="list-style-type-dash">
                    <li>He is aware of the nature of the Internet network and, in particular, its technical performance and response times to consult, examine or transfer data and information.</li>
                    <li>Data transmitted on the Internet is not necessarily protected, in particular against any fraudulent use.</li>
                    <li>The communication to a third party of his identifying data and, in a general manner, of any information considered confidential, is made at his own risk and peril.</li>
                    <li>It is incumbent upon him to take all appropriate measures to protect his own data and/or software from contamination by viruses, as the case may be, on the Internet network.</li>
                    <li>The data and/or information circulating on the internet may be regulated in terms of use or be protected by title and ownership.</li>
                  </ul>
                  <br />

                  <h3 className="_bold">Article 7 - Technical information</h3>
                  <p>As a user of the 'That Ship Has Sailed' site, you acknowledge that you: have the necessary skills and means to access and use this site: Browsers:</p>
                  <ul>
                    <li>Microsoft Internet Explorer 11</li>
                    <li>Certain versions of Mozilla Firefox</li>
                    <li>Chrome version 20 and higher</li>
                    <li>have verified that your computer configuration does not contain any virus and that it is in perfect operating condition;</li>
                    <li>have been informed that the 'That Ship Has Sailed' site is accessible 24/7, except in cases of force majeure, problems with computer systems, technology or telecommunications networks. For maintenance purposes, the owner may interrupt access to the site, and will make every effort to alert the users in advance;</li>
                    <li>have been informed that the cost of access and browsing on the 'That Ship Has Sailed' site is exclusively at your expense.</li>
                  </ul>
                  <br />

                  <h3 className="_bold">Article 8 - Modification of the Service and the Terms of Use</h3>
                  <p>
                    The Service will change over time and the 'That Ship Has Sailed' site may, as necessary, modify these Terms of Use. These modifications will be implemented without prior notification. Each time Users visit the site, they should refer to the most recent version of the Terms of Use, which are permanently available at the following address : http://shipsailing.club/terms
                  </p>
                  <br />

                  <h3 className="_bold">Article 9 - Warranties</h3>
                  <p>
                    The User acknowledges and expressly accepts the following points.
                  </p>
                  <p>
                    The Service offered by the 'That Ship Has Sailed' site is for private use, response times, bandwidths and the rate of availability of the Service having been optimised to respond to such use. However, no guarantee is made in this regard.
                  </p>
                  <p>
                    Taking into account the evolving nature of the Service, in particular the constraints of maintenance and technological development, the continuity of the Service is 99%. In the event of interruption of the Service, the 'That Ship Has Sailed' site or the service provider that it has chosen for this purpose, will apply all reasonable means to remedy this as quickly as possible.
                  </p>
                  <br />

                  <h3 className="_bold">Article 10 - Miscellaneous Clauses</h3>
                  <p>
                    Failure by the 'That Ship Has Sailed' site to exercise its rights under this document shall not constitute a waiver of such rights.
                  </p>
                  <p>
                    In the event that any of the clauses of these Terms of Use should be annulled by legal decision, this decision will not call into question the validity of the other clauses, which will continue to apply between the parties.
                  </p>
                  <p>The titles of the articles have only indicative value.</p>
                  <br />

                  <h3 className="_bold">Article 11 - Applicable Law</h3>
                  <p>Applicable law for these Terms of Use is Thai law.</p>
                  <br />
                </div>
              }
            />
          </div>
          {/* <Ocean /> */}
        </MainContent>
      </div>
    </div>
  );
};

export default Credit;
