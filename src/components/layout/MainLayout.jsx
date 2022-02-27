/* eslint-disable react/prop-types */
import Nav from '../commons/organisms/Nav';

function MainLayout({ children }) {
  return (
    <div>
      <Nav />
      <main className="transform translate-y-28">{children}</main>
    </div>
  );
}

export default MainLayout;
