import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserStore } from '../stores/useUserStore';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { sendSms, login } = useAuth();
  const { syncWithBackend } = useUserStore();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      setError('请输入正确的手机号');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await sendSms(phone);
      setStep('code');
    } catch (err: any) {
      setError(err.response?.data?.message || '发送验证码失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!code || code.length !== 6) {
      setError('请输入6位验证码');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await login(phone, code);
      await syncWithBackend();
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || '登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-pixel text-[#fbbf24] tracking-wider mb-2">
            PIXEL DIVINATION
          </h1>
          <p className="text-gray-400 text-sm">像素占卜</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          {step === 'phone' ? (
            <>
              <h2 className="text-white text-lg font-pixel mb-4">手机号登录</h2>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] mb-4"
                maxLength={11}
              />
              <button
                onClick={handleSendCode}
                disabled={isLoading || !phone}
                className="w-full bg-[#fbbf24] text-black font-bold py-3 rounded-lg hover:bg-[#facc15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '发送中...' : '获取验证码'}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-white text-lg font-pixel mb-4">输入验证码</h2>
              <p className="text-gray-400 text-sm mb-4">验证码已发送至 {phone}</p>
              <input
                type="text"
                placeholder="请输入6位验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fbbf24] mb-4 text-center text-2xl tracking-widest"
                maxLength={6}
              />
              <button
                onClick={handleLogin}
                disabled={isLoading || !code}
                className="w-full bg-[#fbbf24] text-black font-bold py-3 rounded-lg hover:bg-[#facc15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
              <button
                onClick={() => { setStep('phone'); setCode(''); setError(''); }}
                className="w-full text-gray-400 py-2 mt-2 hover:text-white transition-colors"
              >
                更换手机号
              </button>
            </>
          )}

          {error && (
            <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
          )}
        </div>

        {/* Demo Mode */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            跳过登录，先体验看看 →
          </button>
        </div>

        {/* Terms */}
        <p className="text-gray-600 text-xs text-center mt-6">
          登录即表示同意《用户协议》和《隐私政策》
        </p>
      </div>
    </div>
  );
}
