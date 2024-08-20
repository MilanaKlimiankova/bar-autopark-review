using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using QRCoder;

// https://github.com/codebude/QRCoder

namespace QRgenerator
{
    public partial class QRGenerator : Form
    {
        public QRGenerator()
        {
            InitializeComponent();
        }

        // Обработчик события клика по кнопке "Генерировать"
        private void buttonGenerate_Click(object sender, EventArgs e)
        {
            // Основной URL, к которому будет добавляться гаражный номер
            string url = "https://milanaklimiankova.github.io/bar-autopark-review/?number=";

            // Проверяем, заполнено ли поле "Гаражный номер"
            if (textBoxNumber.Text.Length > 0)
            {
                // Добавляем номер к основному URL
                url += textBoxNumber.Text;

                // Проверяем, включена ли опция "Добавить подпись"
                if (checkBoxText.Checked == true)
                {
                    // Проверяем, заполнено ли поле "Добавить подпись"
                    if (textBoxText.Text.Length > 0)
                    {
                        // Генерируем QR-код с добавленной подписью
                        Bitmap qrCodeImage = drawQRCode(url);
                        qrCodeImage = addText(qrCodeImage);
                        pictureBoxQRCode.Image = qrCodeImage;
                    }
                    else
                    {
                        // Выводим сообщение об ошибке, если поле "Добавить подпись" не заполнено
                        System.Windows.Forms.MessageBox.Show("Заполните поле Добавить подпись!");
                    }
                }
                else
                {
                    // Генерируем QR-код без подписи
                    Bitmap qrCodeImage = drawQRCode(url);
                    pictureBoxQRCode.Image = qrCodeImage;
                }
            }
            else
            {
                // Выводим сообщение об ошибке, если поле "Гаражный номер" не заполнено
                System.Windows.Forms.MessageBox.Show("Заполните поле Гаражный номер!");
            }
        }

        // Метод генерации QR-кода
        private Bitmap drawQRCode(string url)
        {
            // Создаем генератор QR-кодов
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);

            // Создаем QR-код
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);

            return qrCodeImage;
        }

        // Метод добавления текста под QR-кодом
        private Bitmap addText(Bitmap qrBitmap)
        {
            // Размер текста
            int textSize = 70;
            // Поле слева и справа от текста
            int leftRightPadding = 60;

            // Создаем новый bitmap с добавленным текстом
            Bitmap newBitmap = new Bitmap(qrBitmap.Width, qrBitmap.Height + textSize + 150);

            using (Graphics graphics = Graphics.FromImage(newBitmap))
            {
                // Очищаем bitmap
                graphics.Clear(Color.White);

                // Рисуем QR-код на новом bitmap
                graphics.DrawImage(qrBitmap, 0, 0);

                // Рисуем текст под QR-кодом
                using (Font font = new Font("SegoeUI", textSize))
                {
                    SizeF textSizeF = graphics.MeasureString(textBoxText.Text, font);
                    float textX = (newBitmap.Width - textSizeF.Width - 2 * leftRightPadding) / 2 + leftRightPadding;
                    graphics.DrawString(textBoxText.Text, font, Brushes.Black, textX, qrBitmap.Height);
                }
            }

            return newBitmap;
        }

        // Обработчик события клика по кнопке "Сохранить"
        private void buttonSave_Click(object sender, EventArgs e)
        {
            // Проверяем, есть ли изображение в pictureBox
            if (pictureBoxQRCode.Image != null)
            {
                // Создаем диалог сохранения файла
                SaveFileDialog saveFileDialog = new SaveFileDialog();
                saveFileDialog.DefaultExt = ".png";
                saveFileDialog.FileName = textBoxNumber.Text + " QR";
                saveFileDialog.Filter = "Image Files (*.png, *.jpg)|*.png;*.jpg";
                saveFileDialog.Title = "Сохранить QR-код";
                saveFileDialog.ShowDialog();

                // Проверяем, выбран ли файл для сохранения
                if (saveFileDialog.FileName != string.Empty)
                {
                    // Сохраняем изображение в файл
                    string filePath = saveFileDialog.FileName;
                    pictureBoxQRCode.Image.Save(filePath);
                }
            }
            else
            {
                // Выводим сообщение об ошибке, если изображение не найдено
                System.Windows.Forms.MessageBox.Show("Нет изображения!");
            }
        }

        // Обработчик события клика по кнопке "Очистить"
        private void buttonClear_Click(object sender, EventArgs e)
        {
            // Очищаем pictureBox
            pictureBoxQRCode.Image = null;
        }

        // Обработчик события изменения состояния checkBoxText
        private void checkBoxText_CheckedChanged(object sender, EventArgs e)
        {
            // Включаем или выключаем поле "Добавить подпись" в зависимости от состояния checkBoxText
            if (checkBoxText.Checked == true)
            {
                textBoxText.Enabled = true;
            }
            else
            {
                textBoxText.Text = String.Empty;
                textBoxText.Enabled = false;
            }
        }
    }
}