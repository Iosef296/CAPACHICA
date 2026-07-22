export interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  /** Accent hex color when active */
  color?: string;
}

export declare function Tag(props: TagProps): JSX.Element;
