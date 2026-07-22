export interface ButtonProps {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'lake';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Button label */
  children: React.ReactNode;
  /** Renders as <a> when provided */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** Expand to full container width */
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * @startingPoint section="Components" subtitle="Rustic Andean button — primary, secondary, ghost, danger" viewport="700x200"
 */
export declare function Button(props: ButtonProps): JSX.Element;
