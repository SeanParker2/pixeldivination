import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserStore } from '../stores/useUserStore';
import { useToastStore } from '../stores/useToastStore';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { sendSms, login } = useAuth();
  const { syncWithBackend } = useUserStore();
  const showToast = useToastStore(s => s.addToast);
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

        {/* WeChat Login */}
        <div className="text-center mt-4">
          <button
            onClick={() => showToast('微信登录即将开放，敬请期待！', 'info')}
            className="w-full flex items-center justify-center gap-2 bg-[#07C160]/20 border border-[#07C160]/30 text-[#07C160] py-2.5 rounded-lg hover:bg-[#07C160]/30 transition-colors text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.18 2.768c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
            </svg>
            微信登录
          </button>
        </div>

        {/* Demo Mode */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            跳过登录，先体验看看 →
          </button>
          <p className="text-gray-600 text-[10px] mt-1">Demo 验证码：123456</p>
        </div>

        {/* Terms */}
        <p className="text-gray-600 text-xs text-center mt-6">
          登录即表示同意《用户协议》和《隐私政策》
        </p>
      </div>
    </div>
  );
}
