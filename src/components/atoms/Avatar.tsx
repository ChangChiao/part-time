import clsx from 'clsx';

type AvatarParam = {
  image: string | undefined;
  size?: number;
  isVip?: boolean;
  onClick?: () => void;
};

const Avatar = ({
  image = '/assets/images/image-avatar.png',
  size = 40,
  isVip = false,
}: AvatarParam) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-full',
        isVip && 'border-yellow-500 border-2'
      )}
      style={style}
    >
      <img src={image} alt="" />
    </div>
  );
};

export default Avatar;
