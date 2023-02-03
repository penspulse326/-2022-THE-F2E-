import styled from "styled-components";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="container">
        <a className="col-sm-1 col-2" href="#">
          <Logo />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <a className="nav-link disabled">邀請他人簽署</a>
            <a className="nav-link" href="#">
              簽署新文件
            </a>
            <a className="nav-link" href="#">
              登入
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

const Logo = styled.img`
  content: url("../images/logo.png");
  width: 100%;
`;
