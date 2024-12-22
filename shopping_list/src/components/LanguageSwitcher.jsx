const LanguageSwitcher = ({ onChangeLanguage }) => {
    return (
      <div className="language-switcher">
        <button onClick={() => onChangeLanguage('en')}>English</button>
        <button onClick={() => onChangeLanguage('cs')}>Čeština</button>
      </div>
    );
  };
  
  export default LanguageSwitcher;