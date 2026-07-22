export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'clay' | 'gold' | 'lake' | 'reed' | 'neutral' | 'success' | 'danger';
  /** Show a colored dot before text */
  dot?: boolean;
  size?: 'xs' | 'sm' | 'lg';
}

export declare function Badge(props: BadgeProps): JSX.Element;
