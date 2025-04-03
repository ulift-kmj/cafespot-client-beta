import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { checkAuth, addCafe } from '@/api';
import LoadingSpinner from '@components/CafeCreate/LoadingSpinner';
import CafeForm from '@components/CafeCreate/CafeForm';

interface Facilities {
  wifi: boolean;
  parking: boolean;
  bathroom: boolean;
  petFriendly: boolean;
  toGo: boolean;
  delivery: boolean;
  groupAvailable: boolean;
  applePay: boolean;
}

interface Summaries {
  suburban: boolean;
  large: boolean;
  dessert: boolean;
  rooftop: boolean;
  bookCafe: boolean;
  scenicView: boolean;
  culturalComplex: boolean;
  architectureTheme: boolean;
}

interface FormData {
  name: string;
  address: string;
  description: string;
  facilities: Facilities;
  summaries: Summaries;
}

// Define Korean labels for summaries
const summaryLabels: { [key in keyof Summaries]: string } = {
  suburban: '근교',
  large: '대형',
  dessert: '디저트',
  rooftop: '루프탑',
  bookCafe: '북카페',
  scenicView: '뷰맛집',
  culturalComplex: '복합문화',
  architectureTheme: '건축/테마',
};

const CreateCafePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    description: '',
    facilities: {
      wifi: false,
      parking: false,
      bathroom: false,
      petFriendly: false,
      toGo: false,
      delivery: false,
      groupAvailable: false,
      applePay: false,
    },
    summaries: {
      suburban: false,
      large: false,
      dessert: false,
      rooftop: false,
      bookCafe: false,
      scenicView: false,
      culturalComplex: false,
      architectureTheme: false,
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const response = await checkAuth();
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'facilities' || key === 'summaries') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value as string);
      }
    });
    images.forEach((image) => data.append('images', image));

    try {
      await addCafe(data);
      setSuccessMessage('카페가 성공적으로 추가되었습니다!');
      setRedirect(
        window.confirm(
          '카페가 성공적으로 추가되었습니다! 확인을 클릭하면 관리자 페이지로 이동합니다.'
        )
      );
    } catch (error) {
      console.error('Error adding Cafe:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (redirect) return <Navigate to="/admin" />;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-12 md:p-16">
        <h1 className="text-4xl font-semibold text-center text-darkBrown mb-8">
          새 카페 추가
        </h1>
        {successMessage && (
          <p className="text-green-500 text-center mb-6">{successMessage}</p>
        )}
        <CafeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          images={images}
          previews={previews}
          setImages={setImages}
          setPreviews={setPreviews}
          summaryLabels={summaryLabels}
        />
      </div>
    </div>
  );
};

export default CreateCafePage;
