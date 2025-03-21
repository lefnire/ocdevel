import {clickAffiliate} from '~/components/analytics'

interface Product {
  image: string;
  title: string;
  description: string | React.ReactElement;
  link: string;
  linkText?: string;
  key: string;
  price: number;
}

function Product(product: Product) {
  return <div className="mb-4" key={product.key}>
    <div className="d-flex">
      <div className="me-3">
        <img src={product.image} className="product-thumbnail" alt={product.title} />
      </div>
      <div className="d-flex flex-column">
        <h6 className="mb-1">{product.title}</h6>
        <small className="text-body-secondary mb-2">{product.description}</small>
        <a
          href={product.link}
          onClick={clickAffiliate({label: product.key, value: product.price })}
          target="_blank"
          className="btn btn-primary align-self-start"
        >
          <span>{product.linkText || 'View on Amazon'}</span>
        </a>
      </div>
    </div>
  </div>
}

interface Products {
  title: string
  links?: React.ReactElement[]
  products: Product[]
}
export function ProductsCard ({ title, links, products }: Products) {
  return <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map(Product)}
    </div>
  </div>
}
