import Logo from "../assets/liloLogo.avif";

const HeaderLogo = () => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-amber-50/80 shadow-sm ring-1 ring-amber-200 backdrop-blur h-10 w-52">
      <h1 className="text-lg font-semibold text-amber-900">ლილო მოლი</h1>
      <img
        src={Logo}
        alt="Lilo Moli logo"
        className="h-10 w-auto drop-shadow-sm"
      />
    </div>
  );
};

export default HeaderLogo;
