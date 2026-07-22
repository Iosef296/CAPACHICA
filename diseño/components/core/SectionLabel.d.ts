export interface SectionLabelProps {
  children: React.ReactNode;
  /** Decorative prefix character */
  icon?: string;
  /** Color variant */
  color?: 'warm' | 'clay' | 'lake' | 'reed' | 'muted';
}

export declare function SectionLabel(props: SectionLabelProps): JSX.Element;
