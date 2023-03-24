import Image from "next/image";
import Link from "next/link";

const ReadAllItems = (props) => {
  return (
    <div>
      <div>
        {props.allItems.map((item) => (
          <Link href="" key={item._id}>
            <Image src={item.image} width={750} height={500} alt="item-image" />
            <div>
              <h2>¥{item.price}</h2>
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadAllItems;

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall");
  const allItems = await response.json();
  return {
    props: allItems,
  };
};
