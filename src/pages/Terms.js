import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { MainContent, Paper, Title } from "../components";

const Credit = ({ history }) => {
  const handleGoToMenu = () => {
    history.push("/menu");
  };

  return (
    <div className="login-page">
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
                <p className="_text-justify _bold overflow-y">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas a sem id lectus commodo elementum et a lacus.
                  Maecenas sagittis mauris quis quam pharetra porta. Nulla porta
                  hendrerit viverra. Pellentesque habitant morbi tristique
                  senectus et netus et malesuada fames ac turpis egestas.
                  Aliquam blandit turpis sed nibh consequat, at cursus enim
                  rutrum. Praesent commodo mauris libero, et tincidunt mi
                  imperdiet in. Vestibulum venenatis sagittis ipsum, fringilla
                  placerat mi mollis in. Ut tincidunt bibendum tortor, quis
                  elementum lacus accumsan quis. Praesent luctus pharetra diam
                  et pretium. Maecenas et erat dictum, dignissim lacus in,
                  cursus lorem. Integer eu orci id nunc dapibus mattis vitae sit
                  amet tortor. Aliquam viverra convallis dui vel bibendum. Cras
                  laoreet vestibulum ipsum, ut vehicula odio tristique eleifend.
                  Proin sollicitudin luctus risus nec commodo. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames
                  ac turpis egestas. Fusce dignissim sodales augue vitae
                  rhoncus. Nullam et sodales ante. Nulla quis orci in mauris
                  venenatis vulputate. Aliquam vestibulum orci sapien, in
                  tristique enim cursus non. Morbi in lacus sed turpis euismod
                  molestie et ut turpis. Nullam sed vestibulum mauris. Cras ac
                  magna ac tortor vulputate tincidunt. Aenean sed magna eros. Ut
                  eu ornare ligula. Curabitur mauris leo, fringilla eget euismod
                  non, tristique gravida ligula. Cras nec dignissim tortor. Ut
                  luctus bibendum est, ac viverra nisi. Donec a libero velit.
                  Nunc sed finibus sem, eu pretium dolor. Integer dapibus ac
                  justo eu gravida. Integer lobortis ipsum sed nisi feugiat
                  ultricies. Duis aliquam lorem ac justo finibus, faucibus
                  luctus velit condimentum. Duis sed nibh eu arcu tempus
                  pellentesque quis ac eros. Maecenas bibendum cursus purus vel
                  maximus. Nulla auctor lectus quis ex ullamcorper, non varius
                  lorem varius. Orci varius natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Nunc porta felis
                  metus, non semper ligula sagittis ac. Mauris volutpat nisl ut
                  elit fringilla hendrerit. Aenean rhoncus tortor et consectetur
                  tempor. Proin ornare eleifend tellus, non vulputate dolor
                  placerat in. Nulla molestie nisi velit. Pellentesque sodales
                  erat ut ligula tincidunt finibus. Duis ultricies nulla sed
                  viverra congue. Maecenas consequat scelerisque diam in
                  tristique. Sed dignissim mattis nisi, sed fermentum felis
                  mollis et. Nunc convallis risus tellus, vel gravida nulla
                  sagittis sed. Integer quis ex venenatis, sodales leo et,
                  imperdiet elit. Donec finibus ligula vel risus venenatis, ut
                  tincidunt metus imperdiet. Mauris justo felis, feugiat nec
                  sagittis vitae, viverra vel felis. Maecenas molestie nisi mi,
                  id suscipit tortor faucibus sed. Nulla tempor ligula at ante
                  euismod, at tempus enim tristique. Ut lobortis, mauris et
                  congue viverra, elit mauris vulputate lectus, eget facilisis
                  risus orci ut nisl. Cras erat felis, porta nec ultricies
                  vitae, elementum suscipit sapien. Duis volutpat fringilla
                  lacus, non bibendum nisi. Integer quis elit urna. Morbi
                  dignissim, felis egestas vulputate lacinia, arcu elit
                  pellentesque libero, eget congue purus lorem vitae diam. Morbi
                  in purus sit amet erat blandit finibus. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Nam varius orci accumsan imperdiet cursus. Quisque congue
                  arcu hendrerit suscipit tincidunt. Aliquam vel erat eget odio
                  suscipit aliquam. Nullam elementum tellus arcu, at gravida
                  metus tincidunt quis. Pellentesque eleifend nulla nisi, nec
                  molestie magna pulvinar nec. Nunc porttitor varius massa non
                  blandit. Etiam aliquam lorem sed metus auctor, ac facilisis
                  nisi fermentum. Donec varius sem vitae odio maximus, non
                  dictum turpis sagittis. Duis eu ante mollis, condimentum ipsum
                  vel, sodales magna. Sed nunc leo, molestie ut nunc quis,
                  rhoncus fringilla metus. Ut porta massa vitae accumsan mollis.
                  Vivamus dapibus massa quam, id rutrum sapien euismod finibus.
                  Donec fringilla tristique dignissim. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Nam quis sodales eros, in
                  venenatis massa. Phasellus tempus in mauris at rhoncus.
                  Maecenas porta, felis ut malesuada facilisis, est massa
                  placerat elit, vel ullamcorper dolor urna non nisi. Mauris
                  eget urna fringilla, placerat lectus at, blandit augue. Duis
                  quis enim a nulla suscipit rutrum. Suspendisse potenti. Proin
                  id tristique dolor. Duis volutpat mi at urna tristique
                  feugiat. Nunc hendrerit elementum pretium. Suspendisse mollis
                  id turpis at fermentum. Nunc tincidunt erat id erat pretium,
                  at vestibulum nunc molestie. Ut ut eleifend diam. Ut ac auctor
                  mi. Curabitur ut risus dapibus enim rhoncus molestie et ac
                  risus. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Aliquam vestibulum sollicitudin nibh sit amet tempor.
                  Cras porttitor maximus lacus, sit amet lacinia urna blandit a.
                  Sed sit amet faucibus massa, vel auctor neque. Nulla dignissim
                  elit eget tempor tempor. Quisque sodales dignissim
                  sollicitudin. Vivamus congue ipsum et laoreet tempus. Fusce
                  non cursus est. Aliquam erat volutpat. Suspendisse
                  condimentum, purus ac posuere egestas, felis nisl vestibulum
                  libero, vel convallis elit ligula eu nibh. Pellentesque luctus
                  dignissim metus, vitae tempus metus rhoncus sed. In sodales
                  mattis nisl, et accumsan elit cursus in. Donec a fringilla
                  massa. Phasellus tortor sem, tincidunt quis congue sit amet,
                  semper ac odio. Suspendisse consequat ante id sapien interdum,
                  quis imperdiet tortor ornare. Nullam sollicitudin id ipsum
                  vitae tempor. Pellentesque dictum cursus risus id consectetur.
                  Sed eu dui massa. Nunc quis gravida felis. Sed rhoncus justo
                  quis diam mollis tincidunt. Maecenas bibendum ante libero, eu
                  interdum turpis finibus et. Vivamus ornare pretium quam sit
                  amet maximus. Nunc ac consequat massa. Quisque accumsan nisi
                  ut bibendum tempor. Cras non turpis sit amet turpis egestas
                  consectetur. Sed felis ex, fermentum quis finibus a, tincidunt
                  et ligula. Cras at sapien hendrerit, tristique diam at,
                  bibendum metus. Nullam sed congue lorem. Sed erat risus,
                  iaculis sed diam vehicula, laoreet rutrum velit. Donec sit
                  amet arcu vel dolor ullamcorper pretium elementum interdum
                  eros. Duis malesuada ligula id metus tempor ornare. Fusce ut
                  tellus enim. Quisque eleifend tortor ligula, vel pulvinar
                  neque tincidunt eget. Nunc mattis tincidunt orci ac aliquam.
                  Maecenas vitae lectus in massa tempus tincidunt. Maecenas eget
                  felis nunc. Sed pulvinar eros at luctus vulputate. Duis mi
                  nunc, molestie at massa sit amet, luctus vestibulum libero.
                  Nullam a elementum lacus, vitae porttitor metus
                </p>
              }
            />
          </div>
        </MainContent>
      </div>
    </div>
  );
};

export default Credit;
