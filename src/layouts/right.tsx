const RightNav = () => {
  return (
    <aside className="w-[375px] bg-dark-2 px-8 py-12 sticky top-[80px] h-[calc(100vh-80px)] max-2xl:hidden">
      <div>
        <h2 className="text-2xl font-bold">Suggested communities</h2>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Suggested users</h2>
      </div>
    </aside>
  );
};

export default RightNav;
