export interface CardProps {
  title?: string;
  /** Small subtitle badge text */
  subtitle?: string;
  description?: string;
  /** Link URL; renders as <a> when provided */
  href?: string;
  /** Accent color (hex) — drives border, badge, arrow color */
  color?: string;
  /** Override full card background gradient */
  gradient?: string;
  /** Small inline tags below description */
  tags?: string[];
  /** Large icon/emoji above title */
  icon?: React.ReactNode;
  onClick?: () => void;
}

export declare function Card(props: CardProps): JSX.Element;
