import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div className="items-center flex" style={{ display: 'flex', flexDirection: 'row', alignItems: 'top', gap: '0.7rem' }}>
        
        <div className="text-right">
          <div className="profile-name" style={{ fontSize: '1.0rem', fontWeight: '600', color: '#f7fafc', marginBottom: '-0.2rem' }}>
            {user.name}
          </div>

          <div className="text-[0.7rem]">
            {user.email}
          </div>
        </div>

        <div>
          <img 
          src={user.picture || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='110' viewBox='0 0 110 110'%3E%3Ccircle cx='55' cy='55' r='55' fill='%2363b3ed'/%3E%3Cpath d='M55 50c8.28 0 15-6.72 15-15s-6.72-15-15-15-15 6.72-15 15 6.72 15 15 15zm0 7.5c-10 0-30 5.02-30 15v3.75c0 2.07 1.68 3.75 3.75 3.75h52.5c2.07 0 3.75-1.68 3.75-3.75V72.5c0-9.98-20-15-30-15z' fill='%23fff'/%3E%3C/svg%3E`} 
          alt={user.name || 'User'} 
          className="profile-picture"
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '3px solid #fff'
          }}
        />
        </div>
        
      </div>
    ) : null
  );
};

export default Profile;