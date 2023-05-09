import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.scss";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </>
  );
}

export default Layout;
