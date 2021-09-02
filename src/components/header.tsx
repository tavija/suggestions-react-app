
interface IHeader{
  pageTitle: string;
}

export function Header({pageTitle}: IHeader): JSX.Element {
  return (
    <section className="header">
      <h1>{pageTitle}</h1>
    </section>
  );
}
