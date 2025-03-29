import React from 'react';
import { Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';

interface LinkItem {
  label: string;
  link: string;
}

interface LinkDropdownProps {
  links: LinkItem[];
  title: string;
  id: string;
  productKey: string;
}

const LinkDropdown: React.FC<LinkDropdownProps> = ({ links, title, id, productKey }) => {
  if (links.length === 0) return null;

  return (
    <div className="mt-1">
      <DropdownButton
        as={ButtonGroup}
        title={title}
        id={id}
        size="sm"
        variant="link"
      >
        {links.map((item, index) => (
          <Dropdown.Item
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`plausible-event-name=affiliate plausible-event-product=${productKey}`}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default LinkDropdown;