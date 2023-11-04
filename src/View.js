import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Validator from "./Validate.js";
import WinningNum from "./LottoStore.js";

class View {
  static #INPUT_MONEY = "구입금액을 입력해 주세요.\n";
  static #COUNT_LOTTO_QUERY = "개를 구매했습니다.";

  static async askInputMoney() {
    const answer = await Console.readLineAsync(View.#INPUT_MONEY);
    Validator.validateMoneyUnit(answer);
    Validator.validateInputMoney(answer);
    return answer;
  }

  static async printLottoCount(numberOfTickets) {
    MissionUtils.Console.print(numberOfTickets + View.#COUNT_LOTTO_QUERY);
  }

  static async showTickets(tickets) {
    tickets.forEach((ticket) => {
      console.log(`[${ticket.join(", ")}]`);
    });
  }

  static async askWinningNum() {
    const askWinning = new WinningNum();
    return await askWinning.askWinningNum();
  }

  static async askBonusNum() {
    const askBonus = new WinningNum();
    return await askBonus.askBonusNum();
  }

  static printRewardStatistics(calculateEarningResults) {
    const statisticResult = [];
    const statisticsQuery = {
      3: "3개 일치 (5,000원) - ",
      4: "4개 일치 (50,000원) - ",
      5: "5개 일치 (1,500,000원) - ",
      "5+1": "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
      6: "6개 일치 (2,000,000,000원) - ",
    };
    Object.entries(calculateEarningResults.countResults).forEach(
      ([matchCount, count]) => {
        const query = statisticsQuery[matchCount];
        if (query) {
          const resultString = query + count + "개";
          statisticResult.push(resultString);
        }
      }
    );
    return statisticResult;
  }
}

export default View;
