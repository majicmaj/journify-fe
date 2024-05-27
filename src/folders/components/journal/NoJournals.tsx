import Text from "../display/Text";

const NoJournals = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full text-center p-4">
      <img
        src="/journify_256.png"
        alt="Journify Logo"
        className="h-[128px] xl:h-[256px]"
      />
      <Text h={4}>Welcome to Journify</Text>
      <Text>
        Start by clicking the button below to create your first journal entry
      </Text>
    </div>
  );
};

export default NoJournals;
