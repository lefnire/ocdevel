import {clickAffiliate} from '~/components/analytics'

interface Product {
  image: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

export const ProductCard = ({ title, products }: { title: string; products: Product[] }) => (
  <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map((product, i) => (
        <div className="mb-4" key={i}>
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
      ))}
    </div>
  </div>
);
